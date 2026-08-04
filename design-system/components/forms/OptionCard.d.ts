/**
 * A single-select or multi-select quiz answer row — label, optional sublabel, heart mark at the trailing edge.
 */
export interface OptionCardProps {
  label: string;
  sublabel?: string;
  selected?: boolean;
  onClick?: () => void;
}
export function OptionCard(props: OptionCardProps): JSX.Element;
