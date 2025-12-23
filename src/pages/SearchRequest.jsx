import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAxios from '../Hooks/useAxios';
import { Search, Droplets, MapPin, Navigation, User, Calendar, Phone } from 'lucide-react';

const SearchRequest = () => {
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazilas, setUpazilas] = useState([]);
    const [upazila, setUpazila] = useState('');
    const [donors, setDonors] = useState([]); // State to store search results
    const [hasSearched, setHasSearched] = useState(false); // To track if a search was performed
    const [loading, setLoading] = useState(false);

    const axiosInstance = useAxios();

    useEffect(() => {
        axios.get('/upazila.json').then(res => setUpazilas(res.data.upazilas));
        axios.get('/district.json').then(res => setDistricts(res.data.districts));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        const bloodGroup = e.target.blood.value;

        axiosInstance.get(`/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
            .then(res => {
                setDonors(res.data);
                setHasSearched(true);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/* Search Form Card */}
            <div className="bg-white rounded-2xl shadow-xl mt-30 border border-gray-100 p-6 md:p-8 mb-10">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Droplets className="w-6 h-6 text-rose-600" />
                        Find Available Donors
                    </h2>
                </div>

                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Blood Group</label>
                        <select name='blood' defaultValue="Choose blood group" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-rose-500">
                            <option disabled>Choose blood group</option>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">District</label>
                        <select onChange={(e) => setDistrict(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-rose-500">
                            <option value="">Select District</option>
                            {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Upazila</label>
                        <select onChange={(e) => setUpazila(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-rose-500">
                            <option value="">Select Upazila</option>
                            {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                        </select>
                    </div>

                    <button type='submit' className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg">
                        {loading ? "Searching..." : <><Search className="w-5 h-5" /> Search</>}
                    </button>
                </form>
            </div>

            {/* Results Section */}
            <div className="mt-12">
                {!hasSearched ? (
                   <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                            <Search className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700">Ready to find a donor?</h3>
                        <p className="text-gray-500 max-w-xs mx-auto mt-2">
                            Select a blood group and location above to see available donors in your area.
                        </p>
                    </div>
                ) : donors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {donors.map((donor) => (
                            <div key={donor._id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:border-rose-200 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 font-bold text-xl">
                                            {donor.bloodGroup}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{donor.name}</h4>
                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {donor.district}, {donor.upazila}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-4 border-gray-50" />
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone className="w-4 h-4 text-emerald-500" /> {donor.phone || "Private"}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4 text-blue-500" /> Last Donation: {donor.lastDonationDate || "N/A"}
                                    </div>
                                </div>
                                <button className="w-full py-2 bg-rose-50 text-rose-600 font-semibold rounded-lg hover:bg-rose-600 hover:text-white transition-colors">
                                    Request Blood
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-rose-50 rounded-3xl border border-rose-100">
                        <Droplets className="w-12 h-12 text-rose-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-rose-900">No Donors Found</h3>
                        <p className="text-rose-600">Try changing your location or blood group criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchRequest;

