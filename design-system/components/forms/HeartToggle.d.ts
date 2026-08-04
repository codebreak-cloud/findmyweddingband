/**
 * The fine-line heart selection mark. Used on every selectable item in the quiz — outline sand when unselected, filled ink when picked.
 */
export interface HeartToggleProps {
  selected?: boolean;
  size?: number;
  onClick?: () => void;
  /** Render as a non-interactive span (role="img") when nested inside another interactive element, e.g. OptionCard/SongRow. Default 'button'. */
  as?: 'button' | 'span';
}
export function HeartToggle(props: HeartToggleProps): JSX.Element;
