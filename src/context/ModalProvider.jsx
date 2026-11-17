import React, { useState, useEffect } from 'react';
import { ModalContext } from './ModalContext';

export function ModalProvider({ children }) {
  const [testRideOpen, setTestRideOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryVehicle, setEnquiryVehicle] = useState('');

  const [serviceOpen, setServiceOpen] = useState(false);

  const anyModalOpen = testRideOpen || enquiryOpen || serviceOpen;

  // Lock body scroll whenever any modal is active
  useEffect(() => {
    if (!anyModalOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [anyModalOpen]);

  const openTestRide = (vehicleName = '') => {
    setSelectedVehicle(vehicleName);
    setTestRideOpen(true);
  };

  const closeTestRide = () => {
    setTestRideOpen(false);
    setSelectedVehicle('');
  };

  const openEnquiry = (vehicleName = '') => {
    setEnquiryVehicle(vehicleName);
    setEnquiryOpen(true);
  };

  const closeEnquiry = () => {
    setEnquiryOpen(false);
    setEnquiryVehicle('');
  };

  const openService = () => setServiceOpen(true);
  const closeService = () => setServiceOpen(false);

  return (
    <ModalContext.Provider
      value={{
        testRideOpen,
        selectedVehicle,
        openTestRide,
        closeTestRide,
        enquiryOpen,
        enquiryVehicle,
        openEnquiry,
        closeEnquiry,
        serviceOpen,
        openService,
        closeService,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
