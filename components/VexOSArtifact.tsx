export default function VexOSArtifact() {
  return (
    <div className="vexos-artifact" aria-hidden="true">
      <div className="vexos-artifact-aura" />
      <div className="vexos-artifact-orbit vexos-artifact-orbit--outer">
        <span className="vexos-artifact-orbit-node vexos-artifact-orbit-node--one" />
      </div>
      <div className="vexos-artifact-orbit vexos-artifact-orbit--inner">
        <span className="vexos-artifact-orbit-node vexos-artifact-orbit-node--two" />
      </div>

      <div className="vexos-artifact-float">
        <div className="vexos-cube">
          <div className="vexos-cube-face vexos-cube-face--front">
            <span className="vexos-cube-mark">V<span>x</span></span>
            <span className="vexos-cube-name">VEXOS</span>
            <span className="vexos-cube-caption">LINUX DISTRO</span>
            <span className="vexos-cube-rule" />
            <span className="vexos-cube-version">2.2.1 · LIVE</span>
          </div>
          <div className="vexos-cube-face vexos-cube-face--back">
            <span className="vexos-cube-terminal">$_</span>
            <span className="vexos-cube-caption">BUILD · BOOT · CREATE</span>
          </div>
          <div className="vexos-cube-face vexos-cube-face--right">
            <span className="vexos-cube-side-mark">DEBIAN</span>
            <span className="vexos-cube-side-rule" />
            <span className="vexos-cube-side-version">TRIXIE</span>
          </div>
          <div className="vexos-cube-face vexos-cube-face--left">
            <span className="vexos-cube-caption">OPEN SOURCE</span>
            <span className="vexos-cube-side-mark">VEXOS</span>
          </div>
          <div className="vexos-cube-face vexos-cube-face--top">
            <span className="vexos-cube-top-label">VEXOS / BOOTABLE IMAGE</span>
            <span className="vexos-cube-top-grid" />
          </div>
          <div className="vexos-cube-face vexos-cube-face--bottom">
            <span className="vexos-cube-caption">MADE FOR BUILDERS</span>
          </div>
        </div>
      </div>

      <div className="vexos-artifact-chip">
        <span className="vexos-artifact-chip-dot" />
        <span>BOOTABLE LINUX DISTRO</span>
      </div>
    </div>
  );
}
