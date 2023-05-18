import './ColorDetails.css';

const ColorDetails = ( { color_props }) => {
    return color_props ?
    (
            <div className='color-name'>
                {color_props.map(each => {
                    return (
                    <div className='color-display'>
                        <label>Color: 
                            <input type="color" value={each.colors.raw_hex}/>
                        </label>
                        <label>Raw hex: {each.colors.raw_hex}</label>
                        <label>Raw hex value: {each.colors.value}</label>
                        <label>W3C color: 
                            <input type="color" value={each.colors.w3c.hex}/>
                        </label>
                        <label>W3C color name: {each.colors.w3c.name}</label>
                        <label>W3C hex: {each.colors.w3c.hex}</label>
                    </div>
                    )
                })
                } 
            </div>
       
    ) : (
        <div className='error-msg'> 
            {color_props.map(each => {
                return (
                <strong>Try detecting again, use .jpg format123</strong> 
                )
            })
            }
        </div>
    )
}

export default ColorDetails;

