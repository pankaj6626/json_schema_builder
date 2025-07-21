import React, { useState } from 'react';
import FieldItem from './FieldItem';

const SchemaBuilder = () => {
  const [fields, setFields] = useState([]);

  const handleAdd = () => {
    setFields([...fields, { key: '', type: 'string', required: false, children: [] }]);
  };

  const handleChange = (index, newField) => {
    const updated = [...fields];
    updated[index] = newField;
    setFields(updated);
  };

  const handleDelete = (index) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  const generateJSON = (fieldList) => {
    let result = {};
    for (let field of fieldList) {
      if (!field.key) continue;
      if (field.type === 'nested') {
        result[field.key] = generateJSON(field.children || []);
      } else {
        result[field.key] = field.type.toUpperCase();
      }
    }
    return result;
  };

  return (
    <div className="row">
      <div className="col-md-6">
        {fields.map((field, idx) => (
          <FieldItem
            key={idx}
            index={idx}
            field={field}
            onChange={(newField) => handleChange(idx, newField)}
            onDelete={() => handleDelete(idx)}
          />
        ))}
        <button className="btn btn-primary mt-2" onClick={handleAdd}>+ Add Item</button>
      </div>
      <div className="col-md-6">
        <h5>Generated JSON</h5>
        <pre>{JSON.stringify(generateJSON(fields), null, 2)}</pre>
      </div>
    </div>
  );
};

export default SchemaBuilder;
