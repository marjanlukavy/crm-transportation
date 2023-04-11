import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useFetchUsers from "../../utils/firebase/hooks/useFetchUsers";
import { useTripForm } from "../../utils/providers/TripFormContext";

function UserSelect() {
  const {
    carNumber,
    setCarNumber,
    from,
    setFrom,
    to,
    setTo,
    passengers,
    setPassengers,
    setUserId,
  } = useTripForm();
  const users = useFetchUsers();
  const handleUserSelect = async (e: any) => {
    const selectedUser = e.target.options[e.target.selectedIndex].value;
    setUserId(selectedUser);
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="carNumber">Car number:</label>
        <input
          type="text"
          className="form-control"
          id="carNumber"
          required
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="from">From:</label>
        <DatePicker
          selected={from}
          onChange={(date) => setFrom(date)}
          className="form-control"
          id="from"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="to">To:</label>
        <DatePicker
          selected={to}
          onChange={(date) => setTo(date)}
          className="form-control"
          id="to"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="passengers">Passengers:</label>
        <input
          type="number"
          className="form-control"
          id="passengers"
          required
          value={passengers}
          onChange={(e) => setPassengers(parseInt(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="users">Select a user:</label>
        <select
          className="form-control"
          id="users"
          onChange={handleUserSelect}
          required
        >
          <option value="">-- Select a user --</option>
          {users.map((option) => (
            <option key={option.id} value={option.id}>
              {option.displayName}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default UserSelect;
