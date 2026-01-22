# Founders Table Configuration File

## Backend Integration Example (Node.js + Express)

```javascript
// backend/server.js
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Razorpay Configuration
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;

// Verify Razorpay Payment
function verifyRazorpayPayment(payment_id, order_id, signature) {
    const message = order_id + "|" + payment_id;
    const generated_signature = crypto
        .createHmac("sha256", RAZORPAY_SECRET)
        .update(message)
        .digest("hex");
    
    return generated_signature === signature;
}

// Event Registration Endpoint
app.post('/api/register-event', async (req, res) => {
    try {
        const {
            event_id,
            event_name,
            full_name,
            email,
            phone,
            company,
            designation,
            amount,
            payment_id,
            signature
        } = req.body;

        // Validate required fields
        if (!full_name || !email || !phone || !event_id || !payment_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Verify payment (optional - for added security)
        // Uncomment if you want server-side verification
        // if (!verifyRazorpayPayment(payment_id, order_id, signature)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Payment verification failed'
        //     });
        // }

        // Save to database
        const registration = {
            event_id,
            event_name,
            full_name,
            email,
            phone,
            company,
            designation,
            amount,
            payment_id,
            registration_date: new Date().toISOString(),
            status: 'confirmed'
        };

        // TODO: Save to database
        // await Registration.create(registration);

        // Send confirmation email
        await sendConfirmationEmail(email, full_name, event_name);

        res.json({
            success: true,
            message: 'Registration successful',
            data: registration
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
});

// Send Confirmation Email
async function sendConfirmationEmail(email, name, eventName) {
    // Use nodemailer or similar service
    console.log(`Email sent to ${email} for event: ${eventName}`);
    // TODO: Implement email sending
}

// Get Event Registrations
app.get('/api/registrations/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        
        // TODO: Query database for registrations
        const registrations = [];

        res.json({
            success: true,
            data: registrations,
            count: registrations.length
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching registrations'
        });
    }
});

// Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, eventName, eventId } = req.body;

        if (!amount || !eventName) {
            return res.status(400).json({
                success: false,
                message: 'Amount and event name are required'
            });
        }

        // Create order with Razorpay API
        const options = {
            amount: amount * 100, // Convert to paise
            currency: 'INR',
            receipt: `event_${eventId}_${Date.now()}`,
            notes: {
                event_name: eventName,
                event_id: eventId
            }
        };

        // TODO: Call Razorpay API
        // const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            data: {
                order_id: 'order_id_here',
                amount: amount,
                currency: 'INR'
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Order creation failed'
        });
    }
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

## Environment Variables (.env)

```
# Razorpay
RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_ID
RAZORPAY_SECRET=YOUR_SECRET_KEY

# Server
PORT=3000
NODE_ENV=production

# Database
DATABASE_URL=your_database_url

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## Database Schema (MongoDB Example)

```javascript
// models/Registration.js
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    event_id: {
        type: Number,
        required: true
    },
    event_name: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    company: String,
    designation: String,
    amount: {
        type: Number,
        required: true
    },
    payment_id: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Registration', registrationSchema);
```

## Email Template

```html
<!-- emails/confirmation.html -->
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
        }
        .header {
            background: linear-gradient(135deg, #1a73e8, #34a853);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .content {
            background: white;
            padding: 20px;
            margin-top: 20px;
            border-radius: 8px;
        }
        .details {
            background: #f0f0f0;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background: #1a73e8;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Registration Confirmed!</h1>
        </div>
        <div class="content">
            <p>Hi {{name}},</p>
            <p>Thank you for registering for <strong>{{eventName}}</strong> with Founders Table!</p>
            
            <div class="details">
                <p><strong>Event:</strong> {{eventName}}</p>
                <p><strong>Date:</strong> {{eventDate}}</p>
                <p><strong>Time:</strong> {{eventTime}}</p>
                <p><strong>Location:</strong> {{eventLocation}}</p>
                <p><strong>Amount Paid:</strong> ₹{{amount}}</p>
                <p><strong>Payment ID:</strong> {{paymentId}}</p>
            </div>
            
            <p>We're excited to have you join our community! Please save your payment ID for your records.</p>
            
            <a href="https://founderstable.com/event/{{eventId}}" class="button">View Event Details</a>
            
            <p>If you have any questions, feel free to reach out to us at hello@founderstable.com</p>
            
            <p>Looking forward to connecting with you!</p>
            <p><strong>The Founders Table Team</strong></p>
        </div>
    </div>
</body>
</html>
```

## Installation Instructions

```bash
# 1. Initialize Node.js project
npm init -y

# 2. Install dependencies
npm install express cors dotenv crypto axios nodemailer mongoose

# 3. Create .env file
cp .env.example .env

# 4. Update .env with your credentials

# 5. Run server
npm start
```

## Frontend Update for Backend Integration

Update `script.js` to enable backend calls:

```javascript
// Uncomment this line in handlePaymentSuccess function
sendRegistrationToBackend(registrationData);

// And use the actual backend URL
async function sendRegistrationToBackend(data) {
    try {
        const response = await fetch('https://your-backend.com/api/register-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            console.error('Backend error:', result);
            return false;
        }
        
        console.log('Registration saved successfully:', result);
        return true;
    } catch (error) {
        console.error('Error sending registration data:', error);
        return false;
    }
}
```

## Security Checklist

- [ ] Use environment variables for sensitive data
- [ ] Enable CORS only for your domain
- [ ] Verify Razorpay signatures on backend
- [ ] Validate all user inputs
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Add authentication for admin endpoints
- [ ] Log all transactions
- [ ] Regular security audits
- [ ] Keep dependencies updated

## Additional Resources

- Razorpay API: https://razorpay.com/docs/api/orders/
- Express.js: https://expressjs.com/
- MongoDB: https://www.mongodb.com/
- Nodemailer: https://nodemailer.com/
