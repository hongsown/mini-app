import { useState, useEffect } from 'react';

const EditableCell = ({ value, onSave, type = 'text', placeholder = '' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || '');

  useEffect(() => {
    setEditValue(value || '');
  }, [value]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const processedValue = type === 'number' ? parseFloat(editValue) || 0 : editValue;
    onSave(processedValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const formatDisplayValue = (val) => {
    if (type === 'number' && val !== null && val !== '') {
      return parseFloat(val).toFixed(2);
    }
    return val || '';
  };

  if (isEditing) {
    return (
      <div className="editable-cell editing">
        <input
          type={type}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus
          step={type === 'number' ? '0.01' : undefined}
        />
        <div className="edit-actions">
          <button onClick={handleSave} className="save-btn" title="Save">
            ✓
          </button>
          <button onClick={handleCancel} className="cancel-btn" title="Cancel">
            ✕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="editable-cell" onClick={handleEdit} title="Click to edit">
      <span className="cell-value">
        {formatDisplayValue(value)}
        {!value && <span className="placeholder-text">{placeholder}</span>}
      </span>
      <span className="edit-icon">✏️</span>
    </div>
  );
};

export default EditableCell;