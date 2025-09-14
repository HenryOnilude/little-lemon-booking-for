import React, {useState} from "react";
import './BookingForm.css';

function BookingForm() {
    // Main form data state, the object holds all user input data in one place
    const [formData, setFormData] = useState({
        date: '', 
        time: '',
        partySize: 2,
        customerName: '',
        email: '',
        phone: '',
        specialRequests: '',
    });
    //form validation state 
    // Stores error messages for each field that fails validation 
    const [errors, setErrors] = useState({});
    //Tracks whether form is currently being submitting to server
    //true = show loading spinner, disable submit button and false = normal state, user can interact with form 
    const [isSubmitting, setIsSubmitting] = useState(false);

    //
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        let fieldError = "";
        switch(field) {
            case 'email':
                fieldError = validateEmail(value);
                break;
            case 'customerName':
                fieldError = validateName(value);
                break;
            case 'phone':
                fieldError = validatePhone(value);
                break;
            case 'date':
                fieldError = validateDate(value);
                break;
            case 'time':
                fieldError = validateTime(value, formData.date);
                break;
            default:
                break;
        }
        //Update errors for this specific field
        setErrors(prev => ({
            ...prev,
            [field]: fieldError
        }));
    };
    //Validation helper funcion 
    const validateEmail = (email) => {
        if (!email) return "Email is required";
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) return "Please enter a valid email address";
        return "";
    }
    const validateName = (name) => {
        if (!name || name.trim() === "") return "Full name is required";
        if (name.trim().length < 2) return "Name must be at least 2 characters";
        const nameRegex = /^[a-zA-Z\s'-]+$/;
        if (!nameRegex.test(name.trim())) return "Name can only contain letters, spaces, hyphens and apostrophes";
        return "";
    };

    const validatePhone = (phone) => {
        if(!phone) return "Phone number is required";
        //Remove all non-digits to check length
        const digitsOnly = phone.replace(/\D/g, '');
        if (digitsOnly.length < 10) return "Phone number must be at least 10 digits";
        if (digitsOnly.length > 15) return "Phone number must not exceed 15 digits";
        // Allow UK numbers starting with 0 or international format
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (!phoneRegex.test(phone.trim())) return "Please enter a valid phone number";
        return "";
    }; 

    const validateDate = (date) => {
        if (!date) return "Date is required";
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0,0,0,0); //Reset time for accurate comparision 

        if (selectedDate < today) return "Please select a future date";

        //check if it's a sunday (restaurant closed)
        if (selectedDate.getDay() ===0) return "Sorry, we're closed on Sundays";

        //Check if date is within 90 days
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 90);
        if (selectedDate > maxDate) return "Reservations can only be made up to 90 days in advance";

        return "";
    };

    const validateTime = (time, date) => {
        if (!time) return "Please select a time";

        // If selected date is today, check if time is in the future
        const selectedDate = new Date (date);
        const today = new Date();

        if (selectedDate.toDateString() === today.toDateString()) {
            const selectedTime = new Date(`${date} ${time}`);
            const now = new Date();
            if (selectedTime <= now ) return "Please select a future time";
        }

        return "";
    }
    const validateForm = () => {
        const newErrors = {
            date: validateDate(formData.date),
            time: validateTime(formData.time, formData.date),
            customerName: validateName(formData.customerName),
            email: validateEmail(formData.email),
            phone: validatePhone(formData.phone)
        };
        
        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === "");
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validate entire form
        const isValid = validateForm();
        if (!isValid) {
            alert("Please fix the errors below before submitting");
            return;
        }
        
        setIsSubmitting(true);

        setTimeout(() => {
            console.log('Booking submitting:', formData);
            alert('Reservation submitted successfully!');
            setIsSubmitting(false);
        }, 2000);
    };
    const handleReset = () =>{
        setFormData({
        date: '',
        time: '',
        partySize: 2,
        customerName: '',
        email: '',
        phone: '',
        specialRequests: '',
    });
    setErrors({});
};


return (
      // MAIN CONTAINER
      // This div wraps our entire form and provides CSS class for styling
      // className (not class) because JSX uses JavaScript naming conventions
    <div className="booking-form">
        <form aria-labelledby="booking-title">
            <h2 id="booking-title">Reserve Your Table at Little Lemon</h2>
            <fieldset>
                
          <legend>Reservation Details</legend>
            <div className="form-group">
                <label htmlFor="date"> Select Date:</label>
                <input
                    id="date"                        // Links to label's htmlFor
                    type="date"                      // Browser shows calendar picker
                    value={formData.date}           // CONTROLLED: Always shows state value
                    onChange={(e) => handleInputChange('date', e.target.value)} // Updates on every keystroke
                    min={new Date().toISOString().split('T')[0]}                 // VALIDATION: Only allow future dates
                    aria-describedby={errors.date ? "date-error" : undefined}
                    aria-invalid={errors.date ? "true" : "false"}
                    aria-required="true"
                />
                {errors.date && (
                    <span id="date-error" role="alert" className="error">
                        {errors.date}
                    </span>
                )}
            </div>
            </fieldset>
            <div className="form-group">
                <label htmlFor="partySize">Party Size</label>
                <select
                    id="partySize"
                    value={formData.partySize}
                    onChange={(e) => handleInputChange('partySize', parseInt(e.target.value))} >
                        {[1,2,3,4,5,6,7,8].map(size => (
                            <option key={size} value={size}>
                                {size} {size === 1 ? 'Guest' : 'Guests'}
                            </option>
                        ))}
                    </select>
                
            </div>

            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="email address"
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-required="true"
                />
                {errors.email && (
                    <span id="email-error" role="alert" className="error">
                        {errors.email}
                    </span>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="customerName">Full Name:</label>
                <input
                    id="customerName"
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    placeholder="Enter your full name"
                    aria-describedby={errors.customerName ? "customerName-error" : undefined}
                    aria-invalid={errors.customerName ? "true" : "false"}
                    aria-required="true"
                />
                {errors.customerName && (
                    <span id="customerName-error" role="alert" className="error">
                        {errors.customerName}
                    </span>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input 
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="0208 944 472"
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-required="true"
                />
                {errors.phone && (
                    <span id="phone-error" role="alert" className="error">
                        {errors.phone}
                    </span>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="specialRequests"> Special Request (Optional):</label>
                <textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    placeholder="Dietary restrictions, allergies, special occasion, seating prefenences..."
                    rows="4"
                    />
                    {errors.specialRequests && <span className="error">{errors.specialRequests}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="time">Preferred Time:</label>
                <select
                    id="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    aria-describedby={errors.time ? "time-error" : undefined}
                    aria-invalid={errors.time ? "true" : "false"}
                    aria-required ="true"
                    >
                        <option value="">Select a time..</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="17:30">5:30 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="18:30">6:30 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="19:30">7:30 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="20:30">8:30 PM</option>
                        <option value="21:00">9:00 PM</option>
                    </select>
                    {errors.time && (
                        <span id="time-error" role="alert" className="error">
                            {errors.time}
                        </span>
                    )}
            </div>
            <div className="form-group">
                <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                style={{marginRight: '10px', padding: '10px 20px'}}
                >
                    {isSubmitting ? 'Submitting...' : 'Reserve Table'}
                </button>

                <button
                    type="button"
                    onClick={handleReset}
                    style={{padding: '10px 20px'}}
                    >
                        Clear Form
                    </button>
            </div>
            <div style={{backgroundColor: '#f0f0f0', padding: '10px', margin: '20px 0'}}>
                <strong> Debug-Current Form data:</strong>
                <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
        </form>
    </div>

    );
}
export default BookingForm;