import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import "../styles/faq.css";
import Cookies from "js-cookie";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
function FAQ() {
  const [faqs, setFaqs] = useState([]);

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isFaqActive, setIsFaqActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    isActive: true,
  });

  const handleAdd = async () => {
    try {
      setIsLoading(true);
      let response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/faq/add-faq`,
        formData,
        {
          headers: {
            "auth-token": Cookies.get("admin_auth_token"),
          },
        }
      );
      if (response.data.success) {
        window.location.reload();
        setIsLoading(false);
      }
      console.log(response);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    // if (formData.question.trim() && formData.answer.trim()) {
    //   const newFaq = {
    //     id: Date.now(),
    //     ...formData,
    //   };
    //   setFaqs([...faqs, newFaq]);
    //   setFormData({ question: "", answer: "", isActive: true });
    //   setIsAdding(false);
    // }
  };

  const handleEdit = (faq) => {
    setIsAdding(false);
    setIsEditing(true);
    setEditingId(faq.id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      isActive: faq.isActive,
    });
  };

  const handleUpdate = () => {
    if (formData.question.trim() && formData.answer.trim()) {
      setFaqs(
        faqs.map((faq) =>
          faq.id === editingId ? { ...faq, ...formData } : faq
        )
      );
      setEditingId(null);
      setFormData({ question: "", answer: "", isActive: true });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      setFaqs(faqs.filter((faq) => faq.id !== id));
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({ question: "", answer: "", isActive: true });
  };

  const toggleStatus = (id, e) => {
    // let status = isFaqActive ? false : true;
    // setIsFaqActive(status)
    if (isFaqActive) {
      setIsFaqActive(false);
    } else {
      setIsFaqActive(true);
    }

    console.log(!isFaqActive);
  };

  const updateFaq = async (data) => {
    try {
      if (data.isStatus) {
        await axios.put(`
           ${import.meta.env.VITE_API_URL}/api/faq/add-faq
          `);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetch = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/faq/fetch`
      );
      if (response.data.success) {
        setFaqs(response.data.faq);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="faq-page">
      <div className="page-header">
        <div>
          <h1>FAQ Management</h1>
          <p>Create and manage frequently asked questions</p>
        </div>
        {!isAdding && !editingId && (
          <button className="add-button" onClick={() => setIsAdding(true)}>
            <Plus size={20} />
            Add New FAQ
          </button>
        )}
      </div>

      {(isAdding || editingId || isEditing) && (
        <div className="main-faq-form">
          <div className="faq-form-card">
            <h3>{isAdding ? "Add New FAQ" : "Edit FAQ"}</h3>
            <div className="form-group">
              <label>Question</label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                placeholder="Enter the question"
              />
            </div>

            <div className="form-group">
              <label>Answer</label>
              <textarea
                value={formData.answer}
                onChange={(e) =>
                  setFormData({ ...formData, answer: e.target.value })
                }
                placeholder="Enter the answer"
                rows="5"
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                />
                <span>Active (visible to users)</span>
              </label>
            </div>

            <div className="form-actions">
              {!isLoading && (
                <button
                  className="save-button"
                  onClick={isAdding ? handleAdd : handleUpdate}
                >
                  <Save size={18} />
                  {isAdding ? "Add FAQ" : "Update FAQ"}
                </button>
              )}
              {isLoading && (
                <button
                  className="save-button"
                  onClick={isAdding ? handleAdd : handleUpdate}
                >
                  <ThreeDots
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    color="white"
                    width="50"
                    visible={true}
                  />
                </button>
              )}
              <button className="cancel-button" onClick={handleCancel}>
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="faq-stats">
        <div className="stat-card">
          <span className="stat-label">Total FAQs</span>
          <span className="stat-value">{faqs.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active FAQs</span>
          <span className="stat-value">
            {faqs.filter((f) => f.isActive).length}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Inactive FAQs</span>
          <span className="stat-value">
            {faqs.filter((f) => !f.isActive).length}
          </span>
        </div>
      </div>

      <div className="faq-list">
        {faqs.length === 0 ? (
          <div className="empty-state">
            <p>No FAQs yet. Click "Add New FAQ" to create one.</p>
          </div>
        ) : (
          faqs.map((faq) => (
            <div
              key={faq._id}
              className={`faq-card ${!faq.isActive ? "inactive" : ""}`}
            >
              <div className="faq-header">
                <div className="faq-status">
                  <label class="switch">
                    <input
                      type="checkbox"
                      checked={isFaqActive}
                      onChange={(e) => toggleStatus(faq._id, e)}
                    />
                    <span class="slider"></span>
                  </label>
                  {/* <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={faq.isActive}
                      onChange={() => toggleStatus(faq._id)}
                    />
                    <span className="toggle-slider"></span>
                  </label> */}
                  <span className="status-label">
                    {faq.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="faq-actions">
                  <button className="edit-btn" onClick={() => handleEdit(faq)}>
                    <Edit2 size={18} />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(faq.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="faq-content">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FAQ;
