import 'bootstrap/dist/css/bootstrap.min.css';

const Grid = () => {
    return (
        <div className="container text-center">
            <div className="row">
                <div className="col mb-4">
                    <div className="text-center">Customer</div>
                    <input type='text' className="form-control mt-2" placeholder='Enter customer Name' />
                </div>
                <div className="col mb-4">
                    <div className="text-center">Invoice ID</div>
                    <input type='text' className="form-control mt-2" placeholder='Enter Invoice ID' />
                </div>
                <div className="col mb-4">
                    <div className="text-center">Start Date</div>
                    <input type='text' className="form-control mt-2" placeholder='Start Date' />
                </div>
                <div className="col mb-4">
                    <div className="text-center">End Date</div>
                    <input type='text' className="form-control mt-2" placeholder='End Date' />
                </div>
            </div>
        </div>
    );
}

export default Grid;
