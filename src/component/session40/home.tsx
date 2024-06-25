import React, { useState } from "react";
import "./home.css";
import { data as initData } from "./data";

type StudentType = {
  id: number;
  name: string;
  dateOfBirth: string;
  email: string;
  address: string;
  status: boolean;
};

const Student = () => {
  const [data, setData] = useState<StudentType[]>(initData);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Xóa
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(null);

  // Chặn
  const [showBlockStudent, setShowBlockStudent] = useState(false);
  const [selectedBlockStudent, setSelectedBlockStudent] = useState<StudentType | null>(null);

  // Thêm
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Sửa
  const [editStudent, setEditStudent] = useState<StudentType | null>(null);
  const [newName, setNewName] = useState("");
  const [newDateOfBirth, setNewDateOfBirth] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const handleDeleteClick = (student: StudentType) => {
    setSelectedStudent(student);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      setData(data.filter((stu) => stu.id !== selectedStudent.id));
    }
    setShowDeleteConfirm(false);
    setSelectedStudent(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedStudent(null);
  };

  const handleBlockClick = (student: StudentType) => {
    setSelectedBlockStudent(student);
    setShowBlockStudent(true);
  };

  const confirmBlock = () => {
    if (selectedBlockStudent) {
      const updatedData = data.map((stu) => {
        if (stu.id === selectedBlockStudent.id) {
          return { ...stu, status: !stu.status }; // Đảo ngược trạng thái hiện tại
        }
        return stu;
      });
      setData(updatedData);
    }
    setShowBlockStudent(false);
    setSelectedBlockStudent(null);
  };

  const cancelBlock = () => {
    setShowBlockStudent(false);
    setSelectedBlockStudent(null);
  };

  const handleAddFormToggle = () => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) {
      setNewName("");
      setNewDateOfBirth("");
      setNewEmail("");
      setNewAddress("");
    }
  };

  const handleEditClick = (student: StudentType) => {
    setEditStudent(student);
    setShowEditForm(true);
    setNewName(student.name);
    setNewDateOfBirth(student.dateOfBirth);
    setNewEmail(student.email);
    setNewAddress(student.address);
  };

  const handleEditStudent = () => {
    if (newName.trim() === "" || newEmail.trim() === "") {
      alert("Họ và tên và Email không được để trống!");
      return;
    }

    if (!validateEmail(newEmail)) {
      alert("Email không đúng định dạng!");
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(newDateOfBirth);
    if (selectedDate > currentDate) {
      alert("Ngày sinh không được lớn hơn ngày hiện tại!");
      return;
    }

    if (editStudent) {
      const updatedData = data.map((stu) => {
        if (stu.id === editStudent.id) {
          return {
            ...stu,
            name: newName,
            dateOfBirth: newDateOfBirth,
            email: newEmail,
            address: newAddress,
          };
        }
        return stu;
      });
      setData(updatedData);
    }
    setShowEditForm(false);
    setEditStudent(null);

    saveToLocalStorage(data);
  };

  const cancelEdit = () => {
    setShowEditForm(false);
    setEditStudent(null);
  };

  const saveToLocalStorage = (students: StudentType[]) => {
    localStorage.setItem("students", JSON.stringify(students));
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleAddNewStudent = () => {
    if (newName.trim() === "" || newEmail.trim() === "") {
      alert("Họ và tên và Email không được để trống!");
      return;
    }
  
    if (!validateEmail(newEmail)) {
      alert("Email không đúng định dạng!");
      return;
    }
  
    const currentDate = new Date();
    const selectedDate = new Date(newDateOfBirth);
    if (selectedDate > currentDate) {
      alert("Ngày sinh không được lớn hơn ngày hiện tại!");
      return;
    }
  
    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
  
    const newStudent: StudentType = {
      id: newId,
      name: newName,
      dateOfBirth: newDateOfBirth,
      email: newEmail,
      address: newAddress,
      status: true, 
    };
  
    setData([...data, newStudent]);
  
    setShowAddForm(false);
    saveToLocalStorage([...data, newStudent]);
  
    setNewName("");
    setNewDateOfBirth("");
    setNewEmail("");
    setNewAddress("");
  };
  
  const filteredData = data.filter(student => 
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="w-[80%] m-auto mt-4 h-[100vh]">
        <main className="main">
          <header className="d-flex justify-content-between mb-3">
            <h3>Nhân viên</h3>
            <button className="btn btn-primary" onClick={handleAddFormToggle}>
              Thêm mới nhân viên
            </button>
          </header>
          <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
            <input
              style={{ width: 350 }}
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            />
            <i className="fa-solid fa-arrows-rotate" title="Refresh" />
          </div>

          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th colSpan={3}>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((stu, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{stu.name}</td>
                  <td>{stu.dateOfBirth}</td>
                  <td>{stu.email}</td>
                  <td>{stu.address}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <div
                        className={`status status-${stu.status ? "active" : "stop"}`}
                      />
                      <span>{stu.status ? "Đang hoạt động" : "Ngừng hoạt động"}</span>
                    </div>
                  </td>
                  <td>
                    {stu.status ? (
                      <span className="button button-block" onClick={() => handleBlockClick(stu)}>
                        Bỏ chặn
                      </span>
                    ) : (
                      <span className="button button-block" onClick={() => handleBlockClick(stu)}>
                        Chặn
                      </span>
                    )}
                  </td>
                  <td>
                    <span className="button button-edit" onClick={() => handleEditClick(stu)}>Sửa</span>
                  </td>
                  <td>
                    <span className="button button-delete" onClick={() => handleDeleteClick(stu)}>Xóa</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <footer className="d-flex justify-content-end align-items-center gap-3">
            <select className="form-select">
              <option selected>Hiển thị 10 bản ghi trên trang</option>
              <option>Hiển thị 20 bản ghi trên trang</option>
              <option>Hiển thị 50 bản ghi trên trang</option>
              <option>Hiển thị 100 bản ghi trên trang</option>
            </select>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </footer>
        </main>
      </div>

      {/* Form thêm mới nhân viên */}
      {showAddForm && (
        <div className="overlay">
          <form className="form">
            <div className="d-flex justify-content-between align-items-center">
              <h4>Thêm mới nhân viên</h4>
              <i className="fa-solid fa-xmark" onClick={handleAddFormToggle} style={{ cursor: "pointer" }} />
            </div>
            <div>
              <label className="form-label" htmlFor="userName">
                Họ và tên
              </label>
              <input
                id="userName"
                type="text"
                className="form-control"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="dateOfBirth">
                Ngày sinh
              </label>
              <input
                id="dateOfBirth"
                type="date"
                className="form-control"
                value={newDateOfBirth}
                onChange={(e) => setNewDateOfBirth(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" htmlFor="address">
                Địa chỉ
              </label>
              <textarea
                className="form-control"
                id="address"
                rows={3}
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </div>
            <div>
              <button
                className="w-100 btn btn-primary"
                type="button"
                onClick={handleAddNewStudent}
              >
                Thêm mới
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Form sửa thông tin nhân viên */}
      {showEditForm && (
        <div className="overlay">
          <form className="form">
            <div className="d-flex justify-content-between align-items-center">
              <h4>Sửa thông tin nhân viên</h4>
              <i className="fa-solid fa-xmark" onClick={cancelEdit} style={{ cursor: "pointer" }} />
            </div>
            <div>
              <label className="form-label" htmlFor="editUserName">
                Họ và tên
              </label>
              <input
                id="editUserName"
                type="text"
                className="form-control"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="editDateOfBirth">
                Ngày sinh
              </label>
              <input
                id="editDateOfBirth"
                type="date"
                className="form-control"
                value={newDateOfBirth}
                onChange={(e) => setNewDateOfBirth(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" htmlFor="editEmail">
                Email
              </label>
              <input
                id="editEmail"
                type="email"
                className="form-control"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" htmlFor="editAddress">
                Địa chỉ
              </label>
              <textarea
                className="form-control"
                id="editAddress"
                rows={3}
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </div>
            <div>
              <button
                className="w-100 btn btn-primary"
                type="button"
                onClick={handleEditStudent}
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Form xác nhận chặn */}
      {showBlockStudent && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-title">
              <h4>Cảnh báo</h4>
              <i
                className="fa-solid fa-xmark"
                onClick={cancelBlock}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="modal-body-custom">
              <span>
                Bạn có chắc chắn muốn {selectedBlockStudent?.status ? "Bỏ chặn" : "Chặn"} tài
                khoản này?
              </span>
            </div>
            <div className="modal-footer-custom">
              <button className="btn btn-light" onClick={cancelBlock}>
                Hủy
              </button>
              <button className="btn btn-danger" onClick={confirmBlock}>
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form xác nhận xóa */} 
      {showDeleteConfirm && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-title">
              <h4>Cảnh báo</h4>
              <i
                className="fa-solid fa-xmark"
                onClick={cancelDelete}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="modal-body-custom">
              <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
            </div>
            <div className="modal-footer-custom">
              <button className="btn btn-light" onClick={cancelDelete}>
                Hủy
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
