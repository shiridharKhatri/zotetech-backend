import { useEffect, useState } from "react";
import { Trash2, Search, Filter } from "lucide-react";
import "../styles/contacts.css";
import axios from "axios";
import Cookies from "js-cookie";
function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const handleDelete = async (id) => {
    console.log("Delete contact with id:", id);
    try {
      let response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/contact/delete/${id}`,
        {
          headers: {
            "auth-token": Cookies.get("admin_auth_token"),
          },
        }
      );
      if (response.data.success) {
        setContacts(contacts.filter((contact) => contact._id !== id));
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  let fetchContact = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/contact/fetch`,
        {
          headers: {
            "auth-token": Cookies.get("admin_auth_token"),
          },
        }
      );
      if (response.data.success) {
        setContacts(response.data.contact);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div className="contacts-page">
      <div className="page-header">
        <h1>Contact Management</h1>
        <p>View and manage user contact submissions</p>
      </div>

      <div className="contacts-container">
        <div className="contacts-list-section">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="contacts-stats">
            <div className="stat-card">
              <span className="stat-label">Total Contacts</span>
              <span className="stat-value">{contacts.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Filtered Results</span>
              <span className="stat-value">{filteredContacts.length}</span>
            </div>
          </div>

          <div className="contacts-list">
            {filteredContacts.length === 0 ? (
              <div className="empty-state">
                <p>No contacts found</p>
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`contact-card ${
                    selectedContact?.id === contact.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="contact-card-header">
                    <h3>
                      {contact.firstName} {contact.lastName}
                    </h3>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(contact._id);
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="contact-email">{contact.email}</p>
                  <p className="contact-company">
                    {contact.companyName || "No company"}
                  </p>
                  <p className="contact-date">
                    {formatDate(contact.createdAt)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="contact-details-section">
          {selectedContact ? (
            <div className="contact-details">
              <h2>Contact Details</h2>

              <div className="detail-group">
                <label>Name</label>
                <p>
                  {selectedContact.firstName} {selectedContact.lastName}
                </p>
              </div>

              <div className="detail-group">
                <label>Email</label>
                <p>{selectedContact.email}</p>
              </div>

              <div className="detail-group">
                <label>Phone Number</label>
                <p>{selectedContact.number}</p>
              </div>

              {selectedContact.companyName && (
                <div className="detail-group">
                  <label>Company Name</label>
                  <p>{selectedContact.companyName}</p>
                </div>
              )}

              {selectedContact.serviceInterest && (
                <div className="detail-group">
                  <label>Service Interest</label>
                  <p>{selectedContact.serviceInterest}</p>
                </div>
              )}

              {selectedContact.projectBudget && (
                <div className="detail-group">
                  <label>Project Budget</label>
                  <p>{selectedContact.projectBudget}</p>
                </div>
              )}

              <div className="detail-group">
                <label>Message</label>
                <p className="message-text">{selectedContact.message}</p>
              </div>

              <div className="detail-group">
                <label>Submitted At</label>
                <p>{formatDate(selectedContact.createdAt)}</p>
              </div>

              <button
                className="delete-contact-btn"
                onClick={() => handleDelete(selectedContact.id)}
              >
                <Trash2 size={18} />
                Delete Contact
              </button>
            </div>
          ) : (
            <div className="empty-details">
              <Filter size={48} />
              <p>Select a contact to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contacts;
