/**
 * The keyboard-setlist row for the signature song question (Q4/Q6) — behaves like a piano key: presses, settles, marks with a heart.
 */
export interface SongRowProps {
  title: string;
  artist: string;
  selected?: boolean;
  onClick?: () => void;
}
export function SongRow(props: SongRowProps): JSX.Element;
