# Campus Assessment: Doctor Listing Page

## Task Overview

Develop and deploy a doctor listing page that includes:

- An **autocomplete search bar** for doctor names.
- A **filter panel** with:
  - Consultation type (single select).
  - Specialties (multi-select).
  - Sort options (fees and experience).
- A **doctor list** rendered using data from a provided API.
- Sample UI image is attached at the bottom.
- Functionality has more weightage than UI.
- Once done, Fill the Final submission form.
- Final Submission Form Link: https://forms.office.com/r/jzUf2S2tSC

All filters and search must work **entirely on the client side** after the initial API call.

---

##  Features to Implement

### 1. Autocomplete Header
- A search bar at the top with **dropdown suggestions**.
- Suggestions show top 3 matches based on the `name` key.
- On clicking a suggestion or pressing Enter, the list filters accordingly.
- If no matches are found, no suggestions are shown.

### 2. Dynamic Filter Panel
- **Single Filter (Radio):**
  - Options: `Video Consult`, `In Clinic`
  - Only one can be selected at a time.

- **Multi Filter (Checkbox):**
  - Options: Doctor specialities (from dataset).
  - Doctors may have multiple specialities.
  - Multiple filters can be applied simultaneously.

- **Sort Filter:**
  - Sort by:
    - `fees` (ascending)
    - `experience` (descending)

> Filters should work in combination, with the **first applied filter taking precedence**.
