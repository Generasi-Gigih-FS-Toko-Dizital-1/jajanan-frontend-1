export default function Dashboard () {
  return(
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Dashboard</h2>
      </div>
      <div className="p-4">
        <p className="font-semibold text-xl mb-1">
          Hello, Admin!
        </p>
        <p>
          Welcome to Jajan Panel. Here you can manage all the data of your vendors and customers.
        </p>
      </div>
    </div>
  )
}
