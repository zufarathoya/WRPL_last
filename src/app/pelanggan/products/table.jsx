'use client';

import { useEffect, useState } from 'react';

export default function ProductsTable({ initialProducts }) {
    const [filterQuery, setFilterQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(initialProducts || []);

    useEffect(() => {
        setFilteredProducts(
            (initialProducts || []).filter(product =>
                product.nama.toLowerCase().includes(filterQuery.toLowerCase())
            )
        );
    }, [filterQuery, initialProducts]);

    return (
        <div>
            <input
                type="text"
                placeholder="Filter products by name"
                value={filterQuery}
                onChange={e => setFilterQuery(e.target.value)}
                style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
            />
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead style={{ backgroundColor: '#f2f2f2' }}>
                    <tr>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Nama</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <tr key={product._id}>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product._id}</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.nama}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                                No products found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}