# Context

## Current Git State

- Active branch used for the latest task: `feature/dynamic-courses-sanity`
- Latest commit on that branch: `e6dc9dc` (`feat: move courses to sanity`)
- Open PR: `https://github.com/Fenar7/Aider_Academy_Website/pull/5`

## Latest Completed Task

The courses module was moved from static local data to Sanity.

### What changed

- Added a new Sanity `course` schema in [`src/sanity/schemaTypes/courseType.ts`](/Users/mac/Fenar/Web%20Works/aider_academy_full_website/src/sanity/schemaTypes/courseType.ts)
- Registered the `course` schema in [`src/sanity/schemaTypes/index.ts`](/Users/mac/Fenar/Web%20Works/aider_academy_full_website/src/sanity/schemaTypes/index.ts)
- Added typed course models in [`src/sanity/types.ts`](/Users/mac/Fenar/Web%20Works/aider_academy_full_website/src/sanity/types.ts)
- Added course queries in [`src/sanity/queries.ts`](/Users/mac/Fenar/Web%20Works/aider_academy_full_website/src/sanity/queries.ts)
- Added shared course meta helper in [`src/lib/courseMeta.ts`](/Users/mac/Fenar/Web%20Works/aider_academy_full_website/src/lib/courseMeta.ts)
- Replaced the static homepage courses section with Sanity-backed data in [`src/components/OurCourses/OurCourses.tsx`](/Users/mac/Fenar/Web%20Works/aider_academy_full_website/src/components/OurCourses/OurCourses.tsx)
- Added the paginated listing client in [`src/components/OurCourses/CoursesListingPageClient.tsx`](/Users/mac/Fenar/Web%20Works/aider_academy_full_website/src/components/OurCourses/CoursesListingPageClient.tsx)
- Added a polished empty state in [`src/components/OurCourses/CoursesEmptyState.tsx`](/Users/mac/Fenar/Web%20Works/aider_academy_full_website/src/components/OurCourses/CoursesEmptyState.tsx)
- Converted [`src/app/courses/page.tsx`](/Users/mac/Fenar/Web%20Works/aider_academy_full_website/src/app/courses/page.tsx) to fetch courses from Sanity
- Converted [`src/app/courses/[slug]/page.tsx`](/Users/mac/Fenar/Web%20Works/aider_academy_full_website/src/app/courses/[slug]/page.tsx) to fetch detail content, static params, and SEO metadata from Sanity
- Updated course detail consumers:
  - [`src/components/CourseDetailComponents/CourseDetailTabs.tsx`](/Users/mac/Fenar/Web%20Works/aider_academy_full_website/src/components/CourseDetailComponents/CourseDetailTabs.tsx)
  - [`src/components/CourseDetailComponents/CourseDetailSidebar.tsx`](/Users/mac/Fenar/Web%20Works/aider_academy_full_website/src/components/CourseDetailComponents/CourseDetailSidebar.tsx)
- Removed the old static data source [`src/data/courses.ts`](/Users/mac/Fenar/Web%20Works/aider_academy_full_website/src/data/courses.ts)

### Important course model details

- The course detail page uses structured fields, not Portable Text-heavy content.
- Per-course editable CTA fields are included:
  - `applyUrl`
  - `brochureUrl`
  - `brochureFile`
  - `callNumber`
- Trainer images are optional in the schema, and the UI supports a fallback avatar.
- Homepage course selection uses:
  - first `showOnHomepage == true`
  - fallback to ordered courses if no featured ones are flagged

## Verification

- `npm run build` passed
- Targeted `eslint` passed on the changed courses/Sanity files with warnings only

### Known warnings

- Existing `@next/next/no-img-element` warnings in course UI files
- Existing Sass deprecation warning in [`src/components/HeroSection/style.scss`](/Users/mac/Fenar/Web%20Works/aider_academy_full_website/src/components/HeroSection/style.scss) for `darken()`

## Working Tree Notes

- The branch was cleaned before PR creation.
- Unrelated local work was preserved in stash:
  - `stash@{0}`: `temp-unrelated-before-course-pr`
- Older preserved stashes still exist:
  - `stash@{1}`: `temp-before-global-transition-system`
  - `stash@{2}`: `post-pr-local-followups`

## If work continues from this point

- Review and merge PR `#5` first if the next task depends on the dynamic courses changes being on `main`
- Use `/studio` to create and publish `course` documents before expecting dynamic courses to appear
- If continuing local non-course work, check `git stash list` before applying anything so the right stash is restored
