import './SceneLayer.css'

/**
 * The Scene Layer is an exhibit's entire background — one full-bleed
 * environment image, not a framed picture inside the layout. Everything
 * else in the exhibit floats above it.
 *
 * `image` points at the exhibit's placeholder photo (see e.g.
 * data/jurassic.js); `focalPoint` nudges the cover-crop so tall subjects
 * aren't cut off. `active` drives a subtle fade so the current exhibit
 * reads clearly against its neighbors while scrolling between them.
 */
function SceneLayer({ image, focalPoint = '50% 50%', active }) {
  return (
    <div
      className={'scene-layer' + (active ? ' scene-layer--active' : '')}
      aria-hidden="true"
    >
      <div
        className="scene-layer__image"
        style={{ backgroundImage: `url(${image})`, backgroundPosition: focalPoint }}
      />
      <div className="scene-layer__overlay" />
    </div>
  )
}

export default SceneLayer