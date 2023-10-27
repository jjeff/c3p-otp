# C3P.OTP

```
                                     /~\                           
                                    |o o)      We're doomed!       
                                    _\=/_                          
                    ___        #   /  _  \   #                     
                   /() \        \\//|/.\|\\//                      
                 _|_____|_       \/  \_/  \/                       
                | | === | |         |\ /|                          
                |_|  O  |_|         \_ _/                          
                 ||  O  ||          | | |                          
                 ||__*__||          | | |                          
                |~ \___/ ~|         []|[]                          
                /=\ /=\ /=\         | | |                          
________________[_]_[_]_[_]________/_]_[_\_________________________
```

## Description

This is a simple one-time-password handler (with a Star Wars theme). The class creates a set of form fields that act as one input field. The user can enter the OTP in the first field and the focus will automatically move to the next field. The user can also use the backspace key to move to the previous field. Pasting into the first field will automatically fill the rest of the fields. Input will be automatically submitted when the last field is filled. A callback function can be used to handle the input. Alternately, the class will emit custom events when any input has been entered as well as when all fields are full. There is also an option to add a submit button.

## Usage

### HTML

```html
<div id="otp"></div>
```

### JavaScript

```javascript
const otp = new OtpSet({
    container: document.getElementById('otp'),
    fields: 6,
    callback: function (otp) {
        console.log(otp);
    }
});
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| container | HTMLElement | null | The container element for the OTP fields. |
| fields | Number | 6 | The number of OTP fields to create. |
| callback | Function | null | An optional callback function to handle the OTP. |
| submit | Boolean | false | Whether or not to add a submit button. |
| submitText | String | 'Submit' | The text to display on the submit button. |
| submitClass | String | 'otp-submit' | The class to add to the submit button. |

## Events

| Event | Description |
| --- | --- |
| otp-input | Fired when any input has been entered. |
| otp-complete | Fired when all fields are full. |

## Methods

| Method | Description |
| --- | --- |
| reset() | Resets the OTP fields. |
| destroy() | Destroys the OTP fields. |

## License

MIT License

## Author

Jeff Robbins
