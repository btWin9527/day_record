import { useState } from 'react';

export default function useSearch() {
  const [filtetText, setFiltetText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const handleFilterChange = (e) => {
    setFiltetText(e.target.value);
  };
  function handleStockChange(e) {
    setInStockOnly(e.target.checked);
  }
  return {
    filtetText,
    inStockOnly,
    handleFilterChange,
    handleStockChange,
  };
}
