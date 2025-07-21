import React from 'react';
import { Form, Button } from 'react-bootstrap';

const FieldItem = ({ field, index, onChange, onDelete }) => {
  const handleKeyChange = (e) => onChange({ ...field, key: e.target.value });

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    if (newType === 'nested') {
      onChange({ ...field, type: newType, children: [] });
    } else {
      onChange({ ...field, type: newType, children: [] });
    }
  };

  const handleRequiredToggle = () => onChange({ ...field, required: !field.required });

  const handleNestedChange = (i, updatedChild) => {
    const updatedChildren = [...field.children];
    updatedChildren[i] = updatedChild;
    onChange({ ...field, children: updatedChildren });
  };

  const handleNestedAdd = () => {
    onChange({ ...field, children: [...(field.children || []), { key: '', type: 'string', required: false }] });
  };

  const handleNestedDelete = (i) => {
    const updatedChildren = [...field.children];
    updatedChildren.splice(i, 1);
    onChange({ ...field, children: updatedChildren });
  };

  return (
    <div className="border p-2 mb-2">
      <div className="d-flex align-items-center mb-2">
        <Form.Control
          placeholder="Key"
          value={field.key}
          onChange={handleKeyChange}
          className="me-2"
        />
        <Form.Select value={field.type} onChange={handleTypeChange} className="me-2" style={{ maxWidth: '150px' }}>
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="nested">nested</option>
        </Form.Select>
        <Form.Check
          type="switch"
          label="Required"
          checked={field.required}
          onChange={handleRequiredToggle}
          className="me-2"
        />
        <Button variant="danger" size="sm" onClick={onDelete}>×</Button>
      </div>

      {field.type === 'nested' && (
        <div className="ms-4">
          {field.children?.map((child, i) => (
            <FieldItem
              key={i}
              index={i}
              field={child}
              onChange={(newField) => handleNestedChange(i, newField)}
              onDelete={() => handleNestedDelete(i)}
            />
          ))}
          <Button variant="primary" size="sm" onClick={handleNestedAdd}>+ Add Item</Button>
        </div>
      )}
    </div>
  );
};

export default FieldItem;