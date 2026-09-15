\# Challenge Findings



\## 1. How the Productivity Score Currently Works



The original TaskNest application had a basic productivity score system based on completed tasks.



After investigating the codebase, the score was found to be stored and returned through the Score model and score controller. The requirement, however, was not clearly connected to task importance or consistency.



The productivity system was improved so that the score is calculated from the user's current completed tasks:



\- A completed normal task contributes 10 points.

\- A completed important task contributes 20 points.

\- An incomplete task contributes 0 points.

\- The score is recalculated from the current task data instead of being permanently increased.



This makes the score reflect the user's actual completed work.



\## 2. Issues Discovered



The main issues discovered were:



\- The original scoring logic did not clearly distinguish between important and normal tasks.

\- The `Task` model did not contain an `important` field.

\- Users had no way to identify important tasks when creating them.

\- The productivity score did not clearly communicate how important tasks affected productivity.

\- The system needed to ensure that completing, uncompleting, or deleting tasks would keep the score consistent.



These issues made the productivity score less meaningful because all completed tasks were effectively treated the same.



\## 3. Proposed Improvements



The productivity system was improved by introducing task importance and a clear scoring rule.



The new scoring system is:



| Task Status | Importance | Score |

|-------------|------------|-------|

| Incomplete | Normal | 0 |

| Incomplete | Important | 0 |

| Completed | Normal | 10 |

| Completed | Important | 20 |



The system also displays:



\- Total completed tasks

\- Completed important tasks

\- Overall task completion percentage

\- A progress message based on completion percentage



The score is calculated from the current database records. This prevents duplicate points when the score is refreshed and automatically keeps the score correct when a task is completed, marked incomplete, or deleted.



\## 4. Implementation Details



The following changes were implemented:



\### Database



Added an `important` Boolean field to the `Task` Prisma model:



```prisma

important Boolean @default(false) *you made to the code.*

