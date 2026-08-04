/**
 * A labelled text field with focus and error states — used for name, email, phone, venue and partner-name capture.
 */
export interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
export function Input(props: InputProps): JSX.Element;
