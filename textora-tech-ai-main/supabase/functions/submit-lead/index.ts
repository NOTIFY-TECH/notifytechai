import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const leadSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  businessName: z.string().trim().max(200, "Business name too long").optional(),
  mobileNumber: z.string().trim().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Invalid phone number"),
  email: z.string().trim().email("Invalid email").max(255, "Email too long"),
  serviceInterested: z.string().trim().max(100, "Service name too long"),
  monthlyVolume: z.string().trim().max(50, "Volume too long"),
  preferredPlan: z.enum(["Silver", "Gold", "Platinum"], { errorMap: () => ({ message: "Plan must be Silver, Gold, or Platinum" }) })
});

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute

async function checkRateLimit(supabase: any, identifier: string, endpoint: string): Promise<boolean> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW);
  
  // Clean up old entries
  await supabase
    .from('rate_limits')
    .delete()
    .lt('window_start', windowStart.toISOString());

  // Check current count
  const { data, error } = await supabase
    .from('rate_limits')
    .select('request_count')
    .eq('identifier', identifier)
    .eq('endpoint', endpoint)
    .gte('window_start', windowStart.toISOString())
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Rate limit check error:', error);
    return true; // Allow on error
  }

  if (data && data.request_count >= MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }

  // Update or create rate limit entry
  if (data) {
    await supabase
      .from('rate_limits')
      .update({ request_count: data.request_count + 1 })
      .eq('identifier', identifier)
      .eq('endpoint', endpoint);
  } else {
    await supabase
      .from('rate_limits')
      .insert({ identifier, endpoint, request_count: 1, window_start: new Date().toISOString() });
  }

  return true;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Rate limiting by IP
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const canProceed = await checkRateLimit(supabase, clientIP, 'submit-lead');
    
    if (!canProceed) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { leadData, conversationId } = await req.json();

    // Validate input
    const validatedData = leadSchema.parse(leadData);
    console.log("Lead submission received:", { conversationId, service: validatedData.serviceInterested });

    // Store lead in database
    const { data: lead, error: dbError } = await supabase
      .from("leads")
      .insert({
        conversation_id: conversationId,
        full_name: validatedData.fullName,
        business_name: validatedData.businessName,
        mobile_number: validatedData.mobileNumber,
        email: validatedData.email,
        service_interested: validatedData.serviceInterested,
        monthly_volume: validatedData.monthlyVolume,
        preferred_plan: validatedData.preferredPlan,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store lead");
    }

    console.log("Lead stored:", lead.id);

    // Send email notification
    const BUSINESS_EMAIL = Deno.env.get("BUSINESS_EMAIL");
    const BUSINESS_WHATSAPP = Deno.env.get("BUSINESS_WHATSAPP_NUMBER");

    const emailBody = `
NEW ENQUIRY RECEIVED

Name: ${validatedData.fullName}
Business: ${validatedData.businessName || 'N/A'}
Phone: ${validatedData.mobileNumber}
Email: ${validatedData.email}
Service: ${validatedData.serviceInterested}
Monthly Volume: ${validatedData.monthlyVolume}
Plan: ${validatedData.preferredPlan}
Source: AI Chatbot

Lead ID: ${lead.id}
Time: ${new Date().toLocaleString()}
    `.trim();

    console.log("Lead notification prepared");
    console.log("Business Email:", BUSINESS_EMAIL);
    console.log("Business WhatsApp:", BUSINESS_WHATSAPP);

    // For now, we'll just log the notification
    // In production, you'd integrate with email service (like Resend) and WhatsApp API
    console.log("Lead notification:", emailBody);

    return new Response(
      JSON.stringify({
        success: true,
        leadId: lead.id,
        message: "Lead captured successfully! Our team will contact you shortly.",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Lead submission error:", error);
    
    // Handle validation errors specifically
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to submit lead",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
