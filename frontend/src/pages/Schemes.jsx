import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SchemeFilters = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        location: '',
        organization: '',
        eligibility: '',
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [schemes, setSchemes] = useState([]);

    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                const response = await axios.get("http://localhost:3000/schemes");
                setSchemes(response.data);
            } catch (error) {
                console.error("Error fetching schemes:", error);
            }
        };

        fetchSchemes();
    }, []);

    const FilterSelect = ({ name, label, options }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
                className="w-full p-2 border rounded-md bg-white"
                value={filters[name]}
                onChange={(e) => setFilters({ ...filters, [name]: e.target.value })}
            >
                <option value="">Select</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );

    const uniqueOptions = (key) => [...new Set(schemes.map(scheme => scheme[key]).filter(Boolean))];

    const filteredSchemes = schemes.filter(scheme => {
        const matchesSearch = searchQuery === '' || scheme.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilters = Object.entries(filters).every(([key, value]) =>
            value === '' || scheme[key]?.includes(value)
        );
        return matchesSearch && matchesFilters;
    });

    return (
        <div className="flex gap-6 p-6">
            <div className="w-64 p-4 bg-white rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Filter By</h2>
                <button 
                    className="text-green-600 mb-4 text-sm"
                    onClick={() => setFilters({ location: '', organization: '', eligibility: '' })}
                >
                    Reset Filters
                </button>
                <FilterSelect name="location" label="Location" options={uniqueOptions("location")} />
                <FilterSelect name="organization" label="Organization" options={uniqueOptions("organization")} />
                <FilterSelect name="eligibility" label="Eligibility" options={uniqueOptions("eligibility")} />
            </div>
            <div className="flex-1">
                <div className="mb-6">
                    <input
                        type="search"
                        placeholder='Search schemes...'
                        className="w-full p-2 border rounded-md"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="space-y-4">
                    {filteredSchemes.map((scheme) => (
                        <div 
                            key={scheme.id}
                            className="p-6 bg-white rounded-lg shadow cursor-pointer"
                            onClick={() => navigate(`/search/${scheme.id}`)}
                        >
                            <h3 className="text-lg font-semibold">{scheme.title}</h3>
                            <p className="text-gray-600">{scheme.description}</p>
                            <div className="flex gap-2 mt-2">
                                {scheme.tags.map((tag, i) => (
                                    <span key={i} className="px-2 py-1 text-sm text-green-700 border border-green-700 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SchemeFilters;
