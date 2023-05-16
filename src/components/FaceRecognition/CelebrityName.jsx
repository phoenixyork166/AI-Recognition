
const CelebrityName = ( {celebrityName}) => {
    return celebrityName ?
    (
        <div className='celebrity-name'> 
            <strong>Celebrity Name:  
                {celebrityName}
            </strong> 
        </div>
    ) : (
        <div className='celebrity-name'> 
            <strong>Try Detect a Celebrity!
            </strong> 
        </div>
    )
}

export default CelebrityName;

