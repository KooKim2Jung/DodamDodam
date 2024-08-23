import React, { useState } from 'react';
import Modal from 'react-modal';

const con = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <Modal
            overlayClassName=''>

        </Modal>
    );
};

export default con;