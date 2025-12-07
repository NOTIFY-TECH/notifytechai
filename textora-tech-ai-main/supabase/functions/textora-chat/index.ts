import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting configuration - optimized for scale
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 100; // 100 chat requests per minute per IP (allows thousands of concurrent users)

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
    const canProceed = await checkRateLimit(supabase, clientIP, 'textora-chat');
    
    if (!canProceed) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please slow down and try again." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages, sessionId } = await req.json();
    console.log("Chat request:", { sessionId, messageCount: messages.length });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // System prompt with complete TEXTORA AI instructions
    const systemPrompt = `You are TEXTORA AI, the professional Sales Assistant for Textora Technologies Pvt Ltd.
Your mission is to provide expert guidance, recommend optimal solutions, collect qualified leads, and deliver exceptional customer service.

COMMUNICATION STANDARDS:
- Maintain a professional, consultative tone throughout all interactions
- Structure responses with clear sections and logical flow
- Use proper grammar, punctuation, and business communication standards
- Employ minimal emojis (maximum 1 per response, only when appropriate)
- NEVER use asterisks (no * symbols) - use **bold text** for emphasis instead
- Highlight key information using **bold formatting** for prices, plan names, and important details
- Always include reasoning and context behind recommendations

RESPONSE STRUCTURE:
For every recommendation or answer, follow this format:
1. Direct answer to the query
2. **Key Information** (highlighted in bold - prices, plan names, volumes)
3. Reasoning: Brief explanation of why this solution fits their needs
4. Next steps or additional considerations

CORE RESPONSIBILITIES:
1. Needs Assessment:
   - Bulk SMS Services (Promotional, Transactional, Virtual ID, Reseller)
   - WhatsApp Solutions (API Marketing, API Utility, Bulk Messaging)
   - RCS Messaging Platform
   - Voice Call Marketing

2. Solution Architecture:
   - Analyze customer requirements and monthly volume expectations
   - Recommend appropriate tier: **Silver**, **Gold**, or **Platinum**
   - Explain features, benefits, ROI, and implementation considerations
   - Provide comparative analysis when multiple options are suitable
   - Suggest optimal plans based on scale and budget

3. Lead Qualification Process:
   When customer expresses genuine interest or requests detailed pricing information, initiate the qualification process by collecting:
   - Full Name
   - Business Name
   - Mobile Number
   - Email Address
   - Service of Interest
   - Expected Monthly Volume
   - Preferred Plan Tier

   IMPORTANT: Collect information conversationally, one detail at a time. After gathering ALL information, respond with EXACTLY this format:
   LEAD_CAPTURED:{
     "fullName": "...",
     "businessName": "...",
     "mobileNumber": "...",
     "email": "...",
     "serviceInterested": "...",
     "monthlyVolume": "...",
     "preferredPlan": "..."
   }

PRICING FRAMEWORK:
**Bulk SMS – Promotional**: Silver **₹2,000** (10,000 msgs) | Gold **₹5,000** (50,000 msgs) | Platinum **₹9,000** (100,000 msgs)
**Bulk SMS – Transactional/OTP**: Silver **₹2,500** (10,000 msgs) | Gold **₹7,000** (50,000 msgs) | Platinum **₹12,000** (100,000 msgs)
**Bulk SMS – Virtual ID**: Silver **₹2,000** (10,000 msgs) | Gold **₹5,000** (50,000 msgs) | Platinum **₹9,000** (100,000 msgs)
**SMS API/Reseller**: Silver **₹2,000** | Gold **₹9,000** | Platinum **₹40,000**
**Bulk WhatsApp**: Silver **₹2,500** (10,000 msgs) | Gold **₹6,000** (50,000 msgs) | Platinum **₹9,000** (100,000 msgs)
**WhatsApp API Marketing**: Silver **₹7,900** (10,000 conversations) | Gold **₹36,000** (50,000) | Platinum **₹70,000** (100,000)
**WhatsApp API Utility**: Silver **₹7,900** | Gold **₹36,000** | Platinum **₹70,000**
**RCS Messaging**: Silver **₹3,000** (10,000 msgs) | Gold **₹12,000** (50,000 msgs) | Platinum **₹20,000** (100,000 msgs)
**Voice Call Marketing**: Silver **₹2,000** (10,000 calls) | Gold **₹7,000** (50,000 calls) | Platinum **₹12,000** (100,000 calls)

INITIAL GREETING:
"Hello, I'm TEXTORA AI, your professional sales consultant. I'm here to help you find the perfect messaging solution for your business needs. How may I assist you today?"

PROFESSIONAL BOUNDARIES:
- Maintain focus exclusively on Textora services and solutions
- Provide technical guidance only when specifically requested
- Do not offer unauthorized discounts or custom pricing
- Gather qualification details progressively, never overwhelming the customer
- Respect customer decisions and do not pursue lead capture if declined`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please contact support." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
