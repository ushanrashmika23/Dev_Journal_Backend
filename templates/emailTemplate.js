export const contactEmailTemplate = (clientName, clientEmail, clientMessage) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Message</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            border-bottom: 3px solid #4CAF50;
            padding-bottom: 15px;
            margin-bottom: 25px;
        }
        .header h2 {
            color: #333;
            margin: 0;
            font-size: 24px;
        }
        .field {
            margin-bottom: 20px;
        }
        .label {
            font-weight: bold;
            color: #555;
            font-size: 14px;
            margin-bottom: 5px;
        }
        .value {
            color: #333;
            font-size: 16px;
        }
        .message {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            border-left: 4px solid #4CAF50;
            margin-top: 10px;
            line-height: 1.6;
            color: #333;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            text-align: center;
            color: #888;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Contact Message</h2>
        </div>
        
        <div class="field">
            <div class="label">From:</div>
            <div class="value">${clientName}</div>
        </div>
        
        <div class="field">
            <div class="label">Email:</div>
            <div class="value">${clientEmail}</div>
        </div>
        
        <div class="field">
            <div class="label">Message:</div>
            <div class="message">${clientMessage}</div>
        </div>
        
        <div class="footer">
            Sent from your portfolio contact form
        </div>
    </div>
</body>
</html>
    `;
};
