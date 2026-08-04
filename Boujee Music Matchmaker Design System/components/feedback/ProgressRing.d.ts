/**
 * The ring progress indicator — a circle that closes across the eleven quiz questions, then becomes the frame around the match percentage.
 */
export interface ProgressRingProps {
  /** 0 to 1 */
  progress?: number;
  size?: number;
  /** Renders fully closed, as at the results reveal */
  closed?: boolean;
}
export function ProgressRing(props: ProgressRingProps): JSX.Element;
