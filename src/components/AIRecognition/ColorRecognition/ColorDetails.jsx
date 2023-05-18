import './ColorDetails.css';

const ColorDetails = ( { color_props }) => {
    return (
            <div className='color-name'>
                {color_props.map(each => {
                    return (
                    <div className='color-display'>
                        <table>
                        <tr>
                            <th>Color</th>
                            <th>Raw hex</th>
                            <th>Raw hex value</th>
                            <th>W3C Color</th>
                            <th>W3C Color Name</th>
                            <th>W3C hex</th>
                        </tr>
                        <tr>
                        <td>
                            <input type="color" value={each.colors.raw_hex}/>
                        </td>
                            
                        <td>
                            {each.colors.raw_hex}
                        </td>
                        <td>
                            {each.colors.value}
                        </td>
                        <td>
                            <input type="color" value={each.colors.w3c.hex}/>
                        </td>
                        <td>
                            {each.colors.w3c.name}
                        </td>
                        <td>
                            {each.colors.w3c.hex}
                        </td>
                        {/* <input class="color1" type="color" name="color1" value="#00ff00"></input> */}
                        </tr>
                        </table>
                    </div>
                    )
                })
                } 
            </div>
    )
}

export default ColorDetails;

