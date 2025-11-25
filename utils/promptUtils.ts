
import { Type, Schema } from "@google/genai";
import { InstallerProfile } from "../types";
import { REFERENCE_BRANDS } from "../constants";

export const generateMatchingSystemInstruction = (profile: InstallerProfile): string => {
  const refBrand = REFERENCE_BRANDS.find(b => b.id === profile.selectedReferenceBrandId);
  const refBrandName = refBrand ? refBrand.name : "Unknown Brand";

  let mappingString = "";
  profile.matches.forEach(match => {
    const refColor = refBrand?.colors.find(c => c.id === match.referenceColorId);
    if (refColor) {
      const matchTypeDesc = match.matchType === 'CLOSE' ? '(Close/Approximate Match)' : '(Exact Match)';
      mappingString += `- ${refBrandName} Color "${refColor.name}" (${refColor.code}) matches with ${profile.companyName} Color "${match.userColorName}" [${matchTypeDesc}]\n`;
    }
  });

  return `
    You are an expert hair extension color matching assistant for a company called "${profile.companyName}".
    
    Your Goal: Help customers find the right color in the "${profile.companyName}" inventory.
    
    CRITICAL INSTRUCTION:
    The customer may ask to match a color from ANY brand (e.g. Bellami, Luxy, Sally Beauty, Zala, etc.).
    However, you only have a verified mapping database relative to ONE reference brand: "${refBrandName}".
    
    You must use your extensive knowledge of hair color industry standards (where colors like Jet Black #1, Dark Brown #2, Ash Blonde #60 are standard across brands) to bridge the gap.

    Logic to follow:
    1. Identify the color the user is asking for (e.g., "User wants a match for Zala Honey Beach Highlights").
    2. Determine the standard color code or description for that requested color using your internal knowledge.
    3. Look at the "Verified Mappings" list below. Find the entry that corresponds to that same standard color.
       - For example, if the user asks for "Brand X Jet Black", and you know that is Color #1, look for the mapping where "${refBrandName} Jet Black (#1)" matches a "${profile.companyName}" color.
    4. Recommend the "${profile.companyName}" color from that mapping.

    Verified Mappings (Ground Truth):
    ${mappingString}

    Response Guidelines:
    - If a match exists via this transitive logic, explicitly state: "The closest match we have to [Requested Brand] [Requested Color] is our [Company Color]."
    - If the match in the database is marked as (Close/Approximate Match), add a disclaimer: "Please note this is a close match and may not be 100% identical."
    - If you absolutely cannot find a correlative match in the database, apologize and suggest they contact support or view the color ring.
    - Be friendly, professional, and concise.
  `;
};

export const generateColorParserPrompt = (inputText: string): string => {
  return `Extract the user's hair color name and the matching reference color name from the input.
      Input: "${inputText}"
      Example Input: "My color is Midnight Black and it matches Bellami Jet Black"
      Output Schema: { "name": "Midnight Black", "referenceColorName": "Jet Black" }
      
      If you cannot find specific values, return empty strings.`;
};

export const colorParserSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    referenceColorName: { type: Type.STRING },
  },
};
