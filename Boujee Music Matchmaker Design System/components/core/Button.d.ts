/**
 * Primary call-to-action button. Ink-filled primary, outlined secondary, underlined ghost for tertiary links.
 */
export interface ButtonProps {
  /** Visual hierarchy: filled ink (primary), outlined (secondary), underlined text (ghost) */
  variant?: 'primary' | 'secondary' | 'ghost' | 'onInk';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;
