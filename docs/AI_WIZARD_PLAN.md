# Fitbite AI Wizard Plan

Version target: V1.3 to V1.4

## Goal

Build an AI-powered pantry wizard inside Fitbite.

The user enters ingredients, then the app helps with:

- Ingredient autocorrect.
- Ingredient normalization.
- Real-time food idea suggestions.
- Recipe options from available ingredients.
- Step-by-step cooking instructions.
- Complete nutrition estimation.
- Macro contribution against user goal.
- Wizard-style guided flow.

## Does it need an API key?

Yes, if Fitbite uses real AI engines such as GPT, Gemini, Claude, or other hosted LLM providers.

The API key must never be exposed in frontend code.

Correct architecture:

User Browser -> Fitbite API Route -> AI Provider -> Fitbite API Route -> User Browser

Wrong architecture:

User Browser -> AI Provider with exposed API key

## Recommended MVP Provider Strategy

Start with one provider only.

Recommended first provider:

- GPT or Gemini for structured recipe JSON.

Later add provider abstraction:

- OpenAI GPT.
- Google Gemini.
- Anthropic Claude.

## Wizard Flow

Step 1: User enters ingredients.
Step 2: App autocorrects and normalizes ingredients.
Step 3: App asks goal and constraints.
Step 4: App generates recipe options.
Step 5: User picks one recipe.
Step 6: App shows cooking steps.
Step 7: App shows nutrition estimate.
Step 8: User chooses cook now, save recipe, or order catering version.

## Realtime Plan

Do not call expensive AI on every keystroke.

Use hybrid approach:

- Local autocomplete for common Indonesian ingredients.
- Debounced API call after user pauses typing.
- AI generation only after user clicks Generate or completes wizard step.

## Data Needed

Ingredient dictionary:

- ayam
- dada ayam
- telur
- tahu
- tempe
- nasi merah
- brokoli
- kangkung
- bayam
- cabai
- bawang merah
- bawang putih
- ikan dori
- sapi rendah lemak

Nutrition source:

- MVP can use internal approximate nutrition table.
- Later use external nutrition database or verified admin nutrition table.

## Output JSON Shape

The AI response should be structured JSON with:

- corrected_ingredients
- recipe_options
- title
- description
- ingredients_used
- additional_ingredients
- cooking_steps
- cooking_time_minutes
- difficulty
- nutrition_estimate
- calories
- protein_g
- carbs_g
- fat_g
- fiber_g
- daily_macro_contribution
- catering_recommendation

## Safety Rules

- Do not make medical claims.
- Nutrition is an estimate.
- Prefer halal Indonesian recipes.
- Minimize food waste.
- Warn about allergies when relevant.
- Keep recipes practical for Indonesian kitchens.

## Implementation Phases

### V1.3

- Build UI wizard mockup.
- Build ingredient input with local autocorrect.
- Build static recipe suggestions.
- Build nutrition result UI.

### V1.4

- Add API route for AI generation.
- Add provider abstraction.
- Add structured JSON validation.
- Add recipe result page.

### V1.5

- Connect recipe result to catering order.
- Add order conversion flow.

## Environment Variables

Use one provider first.

Examples:

OPENAI_API_KEY=
GEMINI_API_KEY=
ANTHROPIC_API_KEY=
AI_PROVIDER=openai

Only server-side code may access these keys.
