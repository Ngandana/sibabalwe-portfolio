// ─────────────────────────────────────────────────────────────────────────
//  YOUR WORDS — fill these in whenever you like.
//
//  Everything else the assistant knows is pulled from the site's data files
//  (projects, skills, education, experience). This file is the one place for
//  things only you can say: your pitch, why you got into dev, what you're
//  looking for next.
//
//  It's entirely optional. Leave a field as an empty string and the assistant
//  simply won't mention that topic — nothing breaks. Fill one in and it starts
//  using it immediately. Write in plain sentences, first person is fine (the
//  assistant will translate to third person when it answers).
// ─────────────────────────────────────────────────────────────────────────

export const PERSONAL = {
  // The one thing you want a recruiter to walk away knowing about you.
  // e.g. "I ship real products end to end — every project on this site is
  //       something people actually use, not a tutorial follow-along."
  elevatorPitch: '',

  // What you're looking for right now, and from when.
  // e.g. "Finishing a Postgraduate Diploma at CPUT (expected 2027). Open to
  //       junior/graduate full-stack roles now — Cape Town or remote."
  availability: '',

  // Why you got into software, in your own words.
  whyDev: '',

  // Interests, side context, anything that makes you a person and not a CV.
  interests: '',

  // How you'd prefer people reach out, if you have a preference.
  // e.g. "Email is best — I reply within a day."
  contactPreference: '',

  // Anything else worth knowing that doesn't fit above. Free text.
  extra: ''
};

const LABELS = {
  elevatorPitch: 'What he most wants people to know about him',
  availability: 'Current availability and what he is looking for',
  whyDev: 'Why he got into software development',
  interests: 'Interests and personal context',
  contactPreference: 'Preferred way to be contacted',
  extra: 'Additional context'
};

// Renders only the fields that have actually been filled in.
export function formatPersonal() {
  const filled = Object.entries(PERSONAL)
    .filter(([, value]) => typeof value === 'string' && value.trim().length > 0)
    .map(([key, value]) => `${LABELS[key] || key}: ${value.trim()}`);

  return filled.length ? filled.join('\n\n') : '';
}
