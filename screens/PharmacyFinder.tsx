import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ChevronLeft, MapPin, Clock, Phone, Navigation, Truck, Package } from 'lucide-react';

interface Pharmacy {
  id: number;
  name: string;
  address: string;
  distance: string;
  hours: string;
  phone: string;
  open: boolean;
  lat: number;
  lng: number;
}

interface DeliveryTracking {
  orderId: string;
  status: 'preparing' | 'out-for-delivery' | 'delivered';
  pharmacyLocation: { lat: number; lng: number; name: string };
  deliveryLocation: { lat: number; lng: number; address: string };
  currentLocation?: { lat: number; lng: number };
  estimatedTime: string;
  driverName: string;
  driverPhone: string;
}

export function PharmacyFinder() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState<number | null>(null);
  const [showDeliveryTracking, setShowDeliveryTracking] = useState(false);
  const [deliveryTracking, setDeliveryTracking] = useState<DeliveryTracking>({
    orderId: 'RX-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    status: 'out-for-delivery',
    pharmacyLocation: { lat: 40.7580, lng: -73.9855, name: 'HealthPlus Pharmacy' },
    deliveryLocation: { lat: 40.7614, lng: -73.9776, address: '456 Your Street' },
    currentLocation: { lat: 40.7595, lng: -73.9820 },
    estimatedTime: '15-20 minutes',
    driverName: 'Alex Johnson',
    driverPhone: '(555) 987-6543'
  });

  const pharmacies: Pharmacy[] = [
    {
      id: 1,
      name: 'HealthPlus Pharmacy',
      address: '123 Main Street',
      distance: '0.3 miles',
      hours: 'Open until 10:00 PM',
      phone: '(555) 123-4567',
      open: true,
      lat: 40.7580,
      lng: -73.9855
    },
    {
      id: 2,
      name: 'CareRx Pharmacy',
      address: '456 Oak Avenue',
      distance: '0.7 miles',
      hours: 'Open 24 hours',
      phone: '(555) 234-5678',
      open: true,
      lat: 40.7614,
      lng: -73.9776
    },
    {
      id: 3,
      name: 'Community Pharmacy',
      address: '789 Elm Street',
      distance: '1.2 miles',
      hours: 'Opens at 8:00 AM',
      phone: '(555) 345-6789',
      open: false,
      lat: 40.7489,
      lng: -73.9680
    },
    {
      id: 4,
      name: 'Wellness Pharmacy',
      address: '321 Pine Road',
      distance: '1.5 miles',
      hours: 'Open until 9:00 PM',
      phone: '(555) 456-7890',
      open: true,
      lat: 40.7542,
      lng: -73.9834
    },
  ];

  const filteredPharmacies = searchQuery
    ? pharmacies.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pharmacies;

  const handleLinkPharmacy = (pharmacyId: number) => {
    localStorage.setItem('careflow_linked_pharmacy', pharmacyId.toString());
    navigate('/dashboard');
  };

  const openGoogleMapsDirections = (lat: number, lng: number, destinationName: string) => {
    // Open Google Maps with directions from current location to the pharmacy
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(destinationName)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const openDeliveryTracking = () => {
    // Open Google Maps showing the route from pharmacy to delivery location with current driver position
    const { pharmacyLocation, deliveryLocation, currentLocation } = deliveryTracking;
    
    // If we have current location, show it as a waypoint
    if (currentLocation) {
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${pharmacyLocation.lat},${pharmacyLocation.lng}&destination=${deliveryLocation.lat},${deliveryLocation.lng}&waypoints=${currentLocation.lat},${currentLocation.lng}&travelmode=driving`;
      window.open(googleMapsUrl, '_blank');
    } else {
      // Just show route from pharmacy to delivery location
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${pharmacyLocation.lat},${pharmacyLocation.lng}&destination=${deliveryLocation.lat},${deliveryLocation.lng}&travelmode=driving`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-light-surface)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Delivery Tracking Button */}
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => setShowDeliveryTracking(!showDeliveryTracking)}
            className="flex items-center gap-2"
          >
            <Truck className="w-5 h-5" />
            Track Active Delivery
          </Button>
        </div>

        {/* Delivery Tracking Panel */}
        {showDeliveryTracking && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6"
          >
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-[var(--color-accent)]">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-accent)] bg-opacity-20 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">Medication Delivery in Progress</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">Order #{deliveryTracking.orderId}</p>
                </div>
              </div>

              {/* Delivery Status */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Status:</span>
                  <span className="px-3 py-1 rounded-full text-sm bg-[var(--color-accent)] text-[var(--color-primary-bg)]">
                    {deliveryTracking.status === 'out-for-delivery' ? '🚚 Out for Delivery' : 
                     deliveryTracking.status === 'preparing' ? '📦 Preparing' : '✅ Delivered'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--color-text-muted)]">Estimated arrival:</span>
                  <span className="font-semibold">{deliveryTracking.estimatedTime}</span>
                </div>
              </div>

              {/* Map showing delivery route */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-[var(--color-accent)] mx-auto mb-2" />
                    <p className="text-xs text-[var(--color-text-muted)]">Live Tracking Map</p>
                  </div>
                </div>

                {/* Pharmacy marker */}
                <div className="absolute left-[20%] top-[30%] w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-white" />
                </div>

                {/* Driver current location marker */}
                {deliveryTracking.currentLocation && (
                  <motion.div
                    animate={{ 
                      x: [0, 20, 40], 
                      y: [0, -10, -5] 
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      ease: "linear" 
                    }}
                    className="absolute left-[45%] top-[40%] w-10 h-10 bg-[var(--color-accent)] rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                  >
                    <Truck className="w-5 h-5 text-white" fill="white" />
                  </motion.div>
                )}

                {/* Delivery destination marker */}
                <div className="absolute right-[20%] bottom-[30%] w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" fill="white" />
                </div>
              </div>

              {/* Driver Info */}
              <div className="flex items-center gap-3 p-3 bg-white bg-opacity-50 rounded-lg mb-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center font-bold text-white">
                  {deliveryTracking.driverName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Driver: {deliveryTracking.driverName}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">From {deliveryTracking.pharmacyLocation.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{deliveryTracking.driverPhone}</p>
                </div>
                <a href={`tel:${deliveryTracking.driverPhone.replace(/\D/g, '')}`}>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                </a>
              </div>

              {/* View in Google Maps Button */}
              <Button 
                variant="primary" 
                fullWidth 
                onClick={openDeliveryTracking}
                className="flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" />
                View Live Route in Google Maps
              </Button>
            </Card>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map View */}
          <div className="order-2 lg:order-1">
            <Card className="h-[500px] relative overflow-hidden">
              {/* Placeholder map */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[var(--color-accent)] mx-auto mb-3" />
                  <p className="text-[var(--color-text-muted)]">Map view</p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    {filteredPharmacies.length} pharmacies nearby
                  </p>
                </div>
              </div>
              
              {/* Map markers simulation */}
              {filteredPharmacies.slice(0, 4).map((pharmacy, i) => (
                <motion.div
                  key={pharmacy.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="absolute w-8 h-8 bg-[var(--color-accent)] rounded-full border-4 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + i * 10}%`,
                  }}
                  onClick={() => setSelectedPharmacy(pharmacy.id)}
                >
                  <MapPin className="w-4 h-4 text-white" fill="white" />
                </motion.div>
              ))}
            </Card>
          </div>

          {/* Pharmacy List */}
          <div className="order-1 lg:order-2 space-y-4">
            <div>
              <h1 className="text-3xl mb-2">Find Pharmacy</h1>
              <p className="text-[var(--color-text-muted)]">Locate pharmacies near you</p>
            </div>

            {/* Search */}
            <Input
              placeholder="Search by name or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Filter chips */}
            <div className="flex gap-2 flex-wrap">
              <button className="px-3 py-1.5 rounded-full text-sm bg-[var(--color-accent)] text-[var(--color-primary-bg)]">
                All
              </button>
              <button className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-[var(--color-text-muted)] hover:bg-gray-200 transition-colors">
                Open now
              </button>
              <button className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-[var(--color-text-muted)] hover:bg-gray-200 transition-colors">
                24 hours
              </button>
            </div>

            {/* Pharmacy cards */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredPharmacies.map((pharmacy) => (
                <motion.div
                  key={pharmacy.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedPharmacy(pharmacy.id)}
                >
                  <Card
                    hoverable
                    className={`cursor-pointer ${
                      selectedPharmacy === pharmacy.id ? 'ring-2 ring-[var(--color-accent)]' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{pharmacy.name}</h3>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                            <MapPin className="w-4 h-4" />
                            {pharmacy.address}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                            <Navigation className="w-4 h-4" />
                            {pharmacy.distance} away
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        <span className={pharmacy.open ? 'text-[var(--color-success)]' : 'text-[var(--color-text-muted)]'}>
                          {pharmacy.hours}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                        <Phone className="w-4 h-4" />
                        {pharmacy.phone}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLinkPharmacy(pharmacy.id);
                        }}
                      >
                        Link Pharmacy
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          openGoogleMapsDirections(pharmacy.lat, pharmacy.lng, pharmacy.name);
                        }}
                      >
                        Directions
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}