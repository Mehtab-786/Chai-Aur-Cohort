import './App.css'

const shows = [
  {
    id: 1,
    title: "The Component Returns",
    time: "10:00 AM",
    hall: "Hall A",
  },
  {
    id: 2,
    title: "Attack of the Re-render",
    time: "12:30 PM",
    hall: "Hall B",
  },
  {
    id: 3,
    title: "Virtual DOM Nights",
    time: "04:00 PM",
    hall: "Hall C",
  },
];

function Foundation02() {

  return (
  <>
    <div>
      <h1>Data listing for Stock Market</h1>
      <div>
        {shows?.map((val,idx) => (
          <div key={idx}>
            <p>{val.title}</p>            
            <p>{val.hall}</p>            
          </div>
        ))}
      </div>
    </div>
  </>
  )
}

export default Foundation02
