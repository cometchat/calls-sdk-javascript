import { Icon } from './Icon';

export function SearchField({
  id,
  value,
  placeholder,
  onChange,
}: {
  id: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="search-field">
      <Icon name="search" size={20} />
      <label htmlFor={id} className="visually-hidden">
        {placeholder}
      </label>
      <input
        id={id}
        className="field"
        type="search"
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="icon-button plain"
          aria-label="Clear search"
          onClick={() => onChange('')}
        >
          <Icon name="close" size={18} />
        </button>
      )}
    </div>
  );
}
