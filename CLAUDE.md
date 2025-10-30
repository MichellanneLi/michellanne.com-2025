# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website built with the Foundation for Sites ZURB Template. It uses a Gulp-based build system to compile Handlebars templates, Sass, and JavaScript into a static site. The site primarily showcases UX design case studies and includes portfolio projects, resume, and about pages.

## Development Commands

### Starting Development
```bash
npm start
```
Runs Gulp's default task which builds the site, starts BrowserSync server at http://localhost:8000, and watches for file changes with live reloading.

### Production Build
```bash
npm run build
```
Creates optimized production assets in the `dist` folder with:
- Compressed CSS
- Minified JavaScript
- Compressed images

## Architecture

### Build System (gulpfile.babel.js)

The Gulp pipeline orchestrates:
1. **Panini (Handlebars)**: Compiles HTML templates with layouts, partials, data, and helpers
2. **Sass**: Compiles SCSS using Dart Sass with Foundation and Motion UI, includes autoprefixer
3. **Webpack**: Bundles JavaScript modules with Babel transpilation (@babel/preset-env)
4. **Images**: Optimizes images in production builds (gifsicle, mozjpeg, optipng, svgo)
5. **BrowserSync**: Live reloading development server on port 8000
6. **Style Sherpa**: Generates style guide from Markdown

### Directory Structure

```
src/
├── pages/              # Page templates (HTML/Handlebars)
│   └── portfolio/      # Portfolio case study pages (landing, project pages)
├── layouts/            # Page layout templates
│   ├── default.html    # Default layout for general pages
│   └── project.html    # Specialized layout for portfolio case studies
├── partials/           # Reusable HTML components
├── assets/
│   ├── scss/
│   │   ├── global/     # Typography, buttons, mixins, helpers
│   │   └── components/ # Component-specific styles
│   ├── js/             # JavaScript (app.js entry point)
│   └── img/            # Images organized by project subdirectories
├── data/               # JSON/YAML data for templates
├── helpers/            # Custom Handlebars helpers
└── styleguide/         # Style Sherpa documentation

dist/                   # Built site output (generated, not committed)
```

### Template System (Panini/Handlebars)

This site uses Panini which extends Handlebars with additional features:

**Two Main Layouts:**
- `default.html` - General pages with conditional logic for homepage vs interior pages
- `project.html` - Portfolio case studies with fixed structure: project hero, nav, and content area

**Key Handlebars Helpers:**
- `{{#ifpage 'index'}}` - Conditional rendering based on current page
- `{{#unlesspage 'index'}}` - Inverse conditional
- `{{> partial-name}}` - Include partials
- `{{> body}}` - Injects page content into layout

**Project Layout Structure:**
The `project.html` layout includes a fixed article structure with:
- `{{> project-hero}}` - Hero section with title, tagline, description, roles, collaborators
- `{{> project-nav}}` - Sidebar navigation (generated from page front matter `pageNavItems`)
- Content area where `{{> body}}` injects the case study content

### Portfolio Case Studies

Portfolio projects live in `src/pages/portfolio/` and use the `project` layout. Each case study includes:

**Front Matter Variables:**
- `layout: project` - Specifies the project layout
- `title` - Project title
- `tagline` - Brief project description
- `clients`, `users` - (Optional) Client and user information
- `description` - Project summary for hero section
- `roles`, `collaborators` - Team information
- `heroimg` - Hero image filename (without extension)
- `pageNavItems` - Array of navigation anchors and titles for sidebar nav

**Content Structure:**
Case studies use section-based structure with page anchors:
```html
<section id="anchor-name" class="page-anchor">
  <section>
    <div class="grid-container full">
      <div class="grid-x grid-padding-x">
        <div class="cell large-10">
          <!-- Content here -->
        </div>
      </div>
    </div>
  </section>
</section>
```

**Images:**
Project images are organized in subdirectories within `src/assets/img/` by project name (e.g., `indeed-education/`, `tbs-annual-enrollment/`). Use the `{{> project-image}}` partial to display images with consistent styling.

### Styling (Foundation + Custom)

The project uses Foundation for Sites with selective component imports. Custom styles are organized in:
- `global/` - Site-wide typography, mixins, helpers, buttons, inline styles
- `components/` - Component-specific styles including project, portfolio, hero, resume, etc.

Main entry point: `src/assets/scss/app.scss`

Note: The gulpfile uses Dart Sass (`require('sass')`) wrapped with gulp-sass.

### JavaScript

Entry point: `src/assets/js/app.js`
- Imports jQuery, Foundation Sites, and what-input
- Includes Stickyfill polyfill for sticky header positioning
- Custom functionality for sticky header behavior and mobile navigation toggle

### Configuration

`config.yml` defines:
- Server port (8000)
- UnCSS options for production (currently commented out in gulpfile)
- Asset paths for Gulp tasks
- Sass library paths (Foundation, Motion UI)
- JavaScript entry points for webpack

## Key Patterns

### Adding New Portfolio Case Studies
1. Create new HTML file in `src/pages/portfolio/` (e.g., `project-name.html`)
2. Set front matter with `layout: project` and all required variables (title, tagline, description, roles, collaborators, pageNavItems)
3. Structure content using `<section id="anchor-name" class="page-anchor">` pattern matching pageNavItems anchors
4. Create project image directory in `src/assets/img/project-name/`
5. Add project to `src/pages/portfolio/landing.html` using the `project-teaser` partial
6. Gulp watch will automatically detect and compile

### Adding New Pages
1. Create HTML file in `src/pages/`
2. Set front matter with `layout: default` (or omit for default)
3. Reference partials with `{{> partial-name}}`
4. Gulp watch will automatically detect and compile

### Adding New Components
1. Create partial in `src/partials/` (e.g., `component-name.html`)
2. Create corresponding SCSS in `src/assets/scss/components/_component-name.scss`
3. Import SCSS in `src/assets/scss/app.scss`
4. Use partial in pages/layouts with `{{> component-name}}`

### Working with the Project Hero Partial
The `project-hero` partial conditionally displays clients and users fields only when they exist in the front matter. If these fields are empty or not needed, simply omit them or leave them blank in the front matter.
