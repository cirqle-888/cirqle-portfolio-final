# Homepage discovery update

Replaced the repeated featured tiles, social media gallery and supermarket flyer display on Home with one compact editorial preview. It selects among the first four published showcase entries on mouse hover, keyboard focus or tap. Videos use their poster here; the full presentation remains on Work. Mobile artwork overrides are supported through picture sources.

Service cards use published collection covers and link to collection galleries. The retail card links to the existing flyer section in gallery mode. Short Services, About, Careers and Contact links replace the long homepage sections, keeping the home page an introduction.

The compact navigation now has numbered oversized links, italic active-page typography, a Cirqle-coloured studio panel and contact action. Phone layouts stack; the existing focus trap, Escape dismissal and theme support remain.

Validation: lint and TypeScript passed; browser regression checks with mocked backend responses passed at mobile and desktop sizes, including homepage selection and service destinations. Production build and static checks passed for 31 routes. Desktop homepage and tablet menu screenshots were visually inspected.

Local preview: http://127.0.0.1:5176/
No live deployment. The independent work_showcases database migration is still pending; local development uses the existing curated preview entries when that table is unavailable.

## Responsive width and section scrolling
Home uses document-level native proximity scroll snapping, with the fixed header height measured for section alignment. Scrolling stays free between section boundaries; no wheel events are intercepted. Reduced-motion preferences disable snapping. The root class and offset are removed when Home unmounts.

Homepage sections and its header now expand with the viewport using modest responsive gutters rather than a 1400px content cap. Above 1600px, artwork, service imagery, typography and spacing scale with the available width. Other routes keep their existing layout.
