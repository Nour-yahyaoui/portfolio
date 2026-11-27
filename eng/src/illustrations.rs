//! Monochrome + restrained Emerald (`#10B981`) technical SVG artwork for `the-factory`.
//!
//! No stock photos, no neon glows, no purple gradients — pure drafting schematics,
//! coordinate systems, gear geometry, and state/dependency diagrams.

/// Right-hand technical schematic for the Home Dashboard Welcome Hero.
pub fn hero_blueprint_svg() -> &'static str {
    r##"<svg class="w-full h-full select-none pointer-events-none" viewBox="0 0 460 230" fill="none" aria-hidden="true">
  <defs>
    <pattern id="heroGrid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFFFFF" stroke-opacity="0.045" stroke-width="0.75"/>
    </pattern>
  </defs>
  <rect width="460" height="230" fill="url(#heroGrid)"/>

  <!-- Technical construction lines & angle arcs -->
  <line x1="20" y1="195" x2="440" y2="35" stroke="#FFFFFF" stroke-opacity="0.10" stroke-width="1" stroke-dasharray="4 4"/>
  <line x1="125" y1="10" x2="125" y2="220" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="0.8"/>
  <line x1="20" y1="115" x2="440" y2="115" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="0.8"/>

  <!-- Precision Mechanical Gear Assembly (Center-Left of Artwork) -->
  <g transform="translate(185, 115)">
    <circle r="76" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1" stroke-dasharray="3 3"/>
    <circle r="60" stroke="#F1F3F5" stroke-opacity="0.42" stroke-width="1.35"/>
    <circle r="44" stroke="#F1F3F5" stroke-opacity="0.28" stroke-width="1"/>
    <circle r="20" stroke="#10B981" stroke-opacity="0.85" stroke-width="1.5"/>
    <circle r="5" fill="#10B981"/>
    <!-- 12 Gear teeth markers -->
    <g stroke="#F1F3F5" stroke-opacity="0.5" stroke-width="3" stroke-linecap="square">
      <line x1="0" y1="-60" x2="0" y2="-68"/>
      <line x1="0" y1="60" x2="0" y2="68"/>
      <line x1="-60" y1="0" x2="-68" y2="0"/>
      <line x1="60" y1="0" x2="68" y2="0"/>
      <line x1="30" y1="-52" x2="34" y2="-59"/>
      <line x1="-30" y1="52" x2="-34" y2="59"/>
      <line x1="52" y1="-30" x2="59" y2="-34"/>
      <line x1="-52" y1="30" x2="-59" y2="34"/>
      <line x1="52" y1="30" x2="59" y2="34"/>
      <line x1="-52" y1="-30" x2="-59" y2="-34"/>
      <line x1="30" y1="52" x2="34" y2="59"/>
      <line x1="-30" y1="-52" x2="-34" y2="-59"/>
    </g>
    <!-- Spokes -->
    <line x1="-44" y1="0" x2="-20" y2="0" stroke="#F1F3F5" stroke-opacity="0.3" stroke-width="1.2"/>
    <line x1="20" y1="0" x2="44" y2="0" stroke="#F1F3F5" stroke-opacity="0.3" stroke-width="1.2"/>
    <line x1="0" y1="-44" x2="0" y2="-20" stroke="#F1F3F5" stroke-opacity="0.3" stroke-width="1.2"/>
    <line x1="0" y1="20" x2="0" y2="44" stroke="#F1F3F5" stroke-opacity="0.3" stroke-width="1.2"/>
    <!-- Emerald vector radius -->
    <line x1="0" y1="0" x2="48" y2="-36" stroke="#10B981" stroke-width="1.5"/>
    <circle cx="48" cy="-36" r="3" fill="#10B981"/>
  </g>

  <!-- Secondary Meshed Pinion -->
  <g transform="translate(282, 68)">
    <circle r="28" stroke="#F1F3F5" stroke-opacity="0.35" stroke-width="1.2"/>
    <circle r="11" stroke="#10B981" stroke-opacity="0.65" stroke-width="1.2"/>
    <circle r="2.5" fill="#F1F3F5" fill-opacity="0.6"/>
  </g>

  <!-- Coordinate Axis & Invariant Formula (Top Right) -->
  <g transform="translate(338, 34)">
    <text x="0" y="14" fill="#F1F3F5" fill-opacity="0.58" font-family="JetBrains Mono, monospace" font-size="11">INV(s) =&gt; true</text>
    <line x1="16" y1="88" x2="16" y2="34" stroke="#F1F3F5" stroke-opacity="0.4" stroke-width="1.1"/>
    <line x1="8" y1="80" x2="92" y2="80" stroke="#F1F3F5" stroke-opacity="0.4" stroke-width="1.1"/>
    <path d="M16 78 Q 44 74, 56 54 T 88 38" stroke="#10B981" stroke-width="1.5" fill="none"/>
    <circle cx="56" cy="54" r="2.5" fill="#10B981"/>
    <text x="22" y="42" fill="#929BA8" font-family="JetBrains Mono, monospace" font-size="9">y</text>
    <text x="88" y="92" fill="#929BA8" font-family="JetBrains Mono, monospace" font-size="9">t</text>
  </g>

  <!-- Isometric Wireframe Cube (Bottom Right) -->
  <g transform="translate(352, 146)" stroke="#F1F3F5" stroke-opacity="0.38" stroke-width="1.1">
    <polygon points="36,0 72,18 72,56 36,74 0,56 0,18"/>
    <polyline points="0,18 36,36 72,18"/>
    <line x1="36" y1="36" x2="36" y2="74"/>
    <polyline points="0,56 36,38 72,56" stroke="#10B981" stroke-opacity="0.45" stroke-dasharray="2 2"/>
  </g>

  <!-- Circuit & State Bus Traces (Bottom Left of Artwork) -->
  <g stroke="#10B981" stroke-opacity="0.55" stroke-width="1.2">
    <polyline points="35,172 78,172 94,156 125,156"/>
    <circle cx="35" cy="172" r="2.5" fill="#10B981"/>
    <polyline points="52,190 92,190 106,176 136,176" stroke="#F1F3F5" stroke-opacity="0.28"/>
    <circle cx="52" cy="190" r="2" fill="#929BA8"/>
  </g>
</svg>"##
}

/// Technical SVG thumbnail per course category for Course Cards.
pub fn course_thumbnail_svg(kind: &str) -> &'static str {
    match kind {
        "systems" => r##"<svg class="w-full h-full" viewBox="0 0 320 128" fill="none" aria-hidden="true">
  <rect width="320" height="128" fill="#111418"/>
  <path d="M0 32h320M0 64h320M0 96h320M64 0v128M128 0v128M192 0v128M256 0v128" stroke="#FFFFFF" stroke-opacity="0.045"/>
  <rect x="24" y="46" width="68" height="34" rx="5" fill="#171C23" stroke="#929BA8" stroke-opacity="0.5"/>
  <text x="37" y="67" fill="#F1F3F5" font-family="JetBrains Mono, monospace" font-size="10">STOCK</text>
  <line x1="92" y1="63" x2="124" y2="63" stroke="#10B981" stroke-width="1.5"/>
  <rect x="124" y="44" width="76" height="38" rx="5" fill="#171C23" stroke="#10B981" stroke-width="1.4"/>
  <text x="135" y="61" fill="#10B981" font-family="JetBrains Mono, monospace" font-size="9.5">RESERVED</text>
  <text x="142" y="74" fill="#929BA8" font-family="JetBrains Mono, monospace" font-size="8">TTL: 600s</text>
  <line x1="200" y1="63" x2="230" y2="63" stroke="#10B981" stroke-width="1.5"/>
  <rect x="230" y="46" width="66" height="34" rx="5" fill="#171C23" stroke="#F1F3F5" stroke-opacity="0.6"/>
  <text x="246" y="67" fill="#F1F3F5" font-family="JetBrains Mono, monospace" font-size="10">SOLD</text>
  <path d="M162 44 C 162 20, 58 20, 58 46" stroke="#929BA8" stroke-opacity="0.55" stroke-dasharray="3 3"/>
  <text x="86" y="22" fill="#929BA8" font-family="JetBrains Mono, monospace" font-size="8.5">expire -&gt; release</text>
</svg>"##,
        "decisions" => r##"<svg class="w-full h-full" viewBox="0 0 320 128" fill="none" aria-hidden="true">
  <rect width="320" height="128" fill="#111418"/>
  <path d="M0 32h320M0 64h320M0 96h320M64 0v128M128 0v128M192 0v128M256 0v128" stroke="#FFFFFF" stroke-opacity="0.045"/>
  <line x1="42" y1="104" x2="284" y2="104" stroke="#929BA8" stroke-opacity="0.5" stroke-width="1.2"/>
  <line x1="42" y1="104" x2="42" y2="20" stroke="#929BA8" stroke-opacity="0.5" stroke-width="1.2"/>
  <path d="M46 96 C 95 92, 132 72, 178 44 C 212 24, 246 24, 276 28" stroke="#10B981" stroke-width="1.8"/>
  <path d="M46 42 C 110 44, 165 65, 276 94" stroke="#929BA8" stroke-opacity="0.5" stroke-width="1.2" stroke-dasharray="4 4"/>
  <circle cx="164" cy="53" r="4.5" fill="#10B981"/>
  <line x1="164" y1="53" x2="164" y2="104" stroke="#10B981" stroke-opacity="0.45" stroke-dasharray="2 2"/>
  <text x="174" y="52" fill="#F1F3F5" font-family="JetBrains Mono, monospace" font-size="9.5">ADR-01 Optimal</text>
  <text x="50" y="28" fill="#929BA8" font-family="JetBrains Mono, monospace" font-size="8.5">Reversibility / ROI</text>
</svg>"##,
        "tasks" => r##"<svg class="w-full h-full" viewBox="0 0 320 128" fill="none" aria-hidden="true">
  <rect width="320" height="128" fill="#111418"/>
  <path d="M0 32h320M0 64h320M0 96h320M80 0v128M160 0v128M240 0v128" stroke="#FFFFFF" stroke-opacity="0.045"/>
  <rect x="28" y="22" width="264" height="84" rx="6" fill="#161B22" stroke="#29313B"/>
  <circle cx="46" cy="40" r="4" fill="#10B981"/>
  <rect x="58" y="36" width="110" height="7" rx="2" fill="#F1F3F5" fill-opacity="0.75"/>
  <rect x="224" y="34" width="52" height="12" rx="3" fill="#10B981" fill-opacity="0.18" stroke="#10B981" stroke-opacity="0.6"/>
  <line x1="42" y1="56" x2="276" y2="56" stroke="#29313B"/>
  <rect x="44" y="66" width="8" height="8" rx="1.5" stroke="#10B981" stroke-width="1.3"/>
  <path d="M46 70l2 2 3.5-4" stroke="#10B981" stroke-width="1.3"/>
  <rect x="60" y="67" width="142" height="6" rx="2" fill="#929BA8" fill-opacity="0.55"/>
  <rect x="44" y="84" width="8" height="8" rx="1.5" stroke="#10B981" stroke-width="1.3"/>
  <path d="M46 88l2 2 3.5-4" stroke="#10B981" stroke-width="1.3"/>
  <rect x="60" y="85" width="176" height="6" rx="2" fill="#929BA8" fill-opacity="0.4"/>
</svg>"##,
        "parallel" => r##"<svg class="w-full h-full" viewBox="0 0 320 128" fill="none" aria-hidden="true">
  <rect width="320" height="128" fill="#111418"/>
  <path d="M0 32h320M0 64h320M0 96h320M64 0v128M128 0v128M192 0v128M256 0v128" stroke="#FFFFFF" stroke-opacity="0.045"/>
  <circle cx="48" cy="64" r="14" fill="#171C23" stroke="#10B981" stroke-width="1.6"/>
  <text x="38" y="67" fill="#10B981" font-family="JetBrains Mono, monospace" font-size="8.5">API</text>
  <path d="M62 64 C 95 64, 95 28, 134 28" stroke="#10B981" stroke-width="1.4"/>
  <path d="M62 64 L 134 64" stroke="#10B981" stroke-width="1.4"/>
  <path d="M62 64 C 95 64, 95 100, 134 100" stroke="#10B981" stroke-width="1.4"/>
  <rect x="134" y="17" width="64" height="22" rx="4" fill="#171C23" stroke="#F1F3F5" stroke-opacity="0.45"/>
  <text x="148" y="31" fill="#F1F3F5" font-family="JetBrains Mono, monospace" font-size="8.5">UI Slice</text>
  <rect x="134" y="53" width="64" height="22" rx="4" fill="#171C23" stroke="#F1F3F5" stroke-opacity="0.45"/>
  <text x="145" y="67" fill="#F1F3F5" font-family="JetBrains Mono, monospace" font-size="8.5">DB Core</text>
  <rect x="134" y="89" width="64" height="22" rx="4" fill="#171C23" stroke="#F1F3F5" stroke-opacity="0.45"/>
  <text x="146" y="103" fill="#F1F3F5" font-family="JetBrains Mono, monospace" font-size="8.5">Worker</text>
  <path d="M198 28 C 232 28, 232 64, 258 64" stroke="#929BA8" stroke-opacity="0.6" stroke-width="1.3"/>
  <path d="M198 64 L 258 64" stroke="#929BA8" stroke-opacity="0.6" stroke-width="1.3"/>
  <path d="M198 100 C 232 100, 232 64, 258 64" stroke="#929BA8" stroke-opacity="0.6" stroke-width="1.3"/>
  <circle cx="272" cy="64" r="14" fill="#171C23" stroke="#F1F3F5" stroke-opacity="0.65" stroke-width="1.4"/>
  <text x="260" y="67" fill="#F1F3F5" font-family="JetBrains Mono, monospace" font-size="8.5">SHIP</text>
</svg>"##,
        "leadership" => r##"<svg class="w-full h-full" viewBox="0 0 320 128" fill="none" aria-hidden="true">
  <rect width="320" height="128" fill="#111418"/>
  <path d="M0 32h320M0 64h320M0 96h320M64 0v128M128 0v128M192 0v128M256 0v128" stroke="#FFFFFF" stroke-opacity="0.045"/>
  <polyline points="24,84 74,84 92,42 114,96 134,58 168,58 186,36 204,64 296,64" stroke="#10B981" stroke-width="1.7" fill="none"/>
  <circle cx="186" cy="36" r="4" fill="#10B981"/>
  <rect x="196" y="22" width="96" height="22" rx="4" fill="#171C23" stroke="#29313B"/>
  <text x="205" y="36" fill="#F1F3F5" font-family="JetBrains Mono, monospace" font-size="8.5">MTTR &lt; 12 min</text>
  <text x="26" y="28" fill="#929BA8" font-family="JetBrains Mono, monospace" font-size="8.5">SIGNAL // REVIEW &amp; OPS</text>
</svg>"##,
        _ => r##"<svg class="w-full h-full" viewBox="0 0 320 128" fill="none" aria-hidden="true">
  <rect width="320" height="128" fill="#111418"/>
  <path d="M0 32h320M0 64h320M0 96h320M64 0v128M128 0v128M192 0v128M256 0v128" stroke="#FFFFFF" stroke-opacity="0.045"/>
  <text x="26" y="36" fill="#10B981" font-family="JetBrains Mono, monospace" font-size="10">enum OrderState &#123;</text>
  <text x="42" y="54" fill="#F1F3F5" fill-opacity="0.82" font-family="JetBrains Mono, monospace" font-size="9.5">Reserved &#123; ttl_sec: u32 &#125;,</text>
  <text x="42" y="70" fill="#F1F3F5" fill-opacity="0.82" font-family="JetBrains Mono, monospace" font-size="9.5">Paid &#123; tx_id: TxId &#125;,</text>
  <text x="26" y="88" fill="#10B981" font-family="JetBrains Mono, monospace" font-size="10">&#125;</text>
  <rect x="212" y="26" width="84" height="24" rx="4" fill="#171C23" stroke="#10B981" stroke-opacity="0.65"/>
  <text x="223" y="41" fill="#10B981" font-family="JetBrains Mono, monospace" font-size="8.5">0 unwrap()</text>
  <text x="26" y="110" fill="#929BA8" font-family="JetBrains Mono, monospace" font-size="8.5">rustc :: compile-time invariants</text>
</svg>"##,
    }
}
