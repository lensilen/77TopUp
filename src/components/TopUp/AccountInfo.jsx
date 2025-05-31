// src/components/TopUp/AccountInfo.jsx
export default function AccountInfo({ formData, setFormData, nextStep }) {
  return (
    <div>
      <h2>Masukkan ID Akun</h2>
      <input
        type="text"
        placeholder="Masukkan ID"
        value={formData.id}
        onChange={(e) =>
          setFormData({ ...formData, id: e.target.value })
        }
      />
      <button onClick={nextStep}>Lanjut</button>
    </div>
  );
}
