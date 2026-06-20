import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotebookPen, Wallet, Palette, UploadCloud, Bold, Italic, List, Link2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AdminFooter from '../components/AdminFooter';
import AdminCard from '../components/AdminCard';
import ToggleSwitch from '../components/ToggleSwitch';
import SizeStockEditor from '../components/SizeStockEditor';
import ColorSwatchPicker from '../components/ColorSwatchPicker';
import MediaUploader from '../components/MediaUploader';
import { CATEGORY_OPTIONS, SUBCATEGORY_OPTIONS, DEFAULT_COLOR_SWATCHES } from '../components/mockData';

const TOOLBAR_BUTTONS = [
  { id: 'bold', icon: Bold },
  { id: 'italic', icon: Italic },
  { id: 'list', icon: List },
  { id: 'link', icon: Link2 },
];

export default function AddProductPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [subCategory, setSubCategory] = useState(SUBCATEGORY_OPTIONS[0]);
  const [retailPrice, setRetailPrice] = useState('');
  const [compareAt, setCompareAt] = useState('');
  const [sizes, setSizes] = useState([
    { size: 'US 8.0', stock: 12 },
    { size: 'US 9.0', stock: 24 },
    { size: 'US 10.0', stock: 8 },
  ]);
  const [colors, setColors] = useState(DEFAULT_COLOR_SWATCHES);
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLOR_SWATCHES[0]);
  const [activeToolbarBtns, setActiveToolbarBtns] = useState([]);
  const [activeDrop, setActiveDrop] = useState(false);
  const [masterImage, setMasterImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  function toggleToolbarBtn(id) {
    setActiveToolbarBtns((prev) => (prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]));
  }

  function handleSave() {
    if (!name.trim()) {
      alert('Give the drop a product name first.');
      return;
    }
    // No backend yet — this is where a POST to /admin/products would go.
    console.log('New product payload:', {
      name, description, category, subCategory, retailPrice, compareAt, sizes, colors: { palette: colors, selected: selectedColor }, activeDrop,
    });
    alert(`"${name}" saved locally (check console) — wire this up to your Products API next.`);
    navigate('/products');
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Topbar />

        <main className="px-8 pb-8 pt-4">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.1em] mb-3">
            <button onClick={() => navigate('/products')} className="text-[#6a6a6a] hover:text-white transition-colors">
              INVENTORY
            </button>
            <span className="text-[#3a3a3a]">›</span>
            <span className="text-white">ADD NEW PRODUCT</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-white">INVENTORY </span>
              <span style={{ color: '#c8ff00' }}>DROP</span>
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/products')}
                className="px-5 py-3 rounded-xl border border-[#333] text-[#cfcfcf] text-xs font-bold tracking-[0.05em] hover:border-white hover:text-white transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleSave}
                style={{ background: '#c8ff00' }}
                className="px-5 py-3 rounded-xl text-black text-xs font-bold tracking-[0.05em] hover:opacity-90 transition-opacity"
              >
                SAVE PRODUCT
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            <AdminCard icon={NotebookPen} title="GENERAL INFO">
              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.12em] text-[#8a8a8a] mb-2">PRODUCT NAME</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. FLEXIO HYPER-BLAST X1"
                    className="w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-[#5a5a5a] focus:border-[#c8ff00] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.12em] text-[#8a8a8a] mb-2">RICH TEXT DESCRIPTION</label>
                  <div className="border border-[#262626] rounded-lg overflow-hidden">
                    <div className="flex items-center gap-1 px-3 py-2 border-b border-[#262626] bg-[#101010]">
                      {TOOLBAR_BUTTONS.map(({ id, icon: Icon }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => toggleToolbarBtn(id)}
                          style={activeToolbarBtns.includes(id) ? { background: '#c8ff00', color: '#000' } : {}}
                          className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                            activeToolbarBtns.includes(id) ? '' : 'text-[#9a9a9a] hover:text-white hover:bg-[#1c1c1c]'
                          }`}
                        >
                          <Icon size={13} />
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the exclusivity, materials, and drop details..."
                      rows={6}
                      className="w-full bg-[#0f0f0f] px-4 py-3 text-white text-sm placeholder:text-[#5a5a5a] outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.12em] text-[#8a8a8a] mb-2">CATEGORY</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#c8ff00] outline-none transition-colors"
                    >
                      {CATEGORY_OPTIONS.map((opt) => <option key={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.12em] text-[#8a8a8a] mb-2">SUB-CATEGORY</label>
                    <select
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      className="w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#c8ff00] outline-none transition-colors"
                    >
                      {SUBCATEGORY_OPTIONS.map((opt) => <option key={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </AdminCard>

            <div className="space-y-5">
              <AdminCard icon={Wallet} title="PRICING & STOCK">
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.12em] text-[#8a8a8a] mb-2">RETAIL PRICE ($)</label>
                    <input
                      type="number"
                      min={0}
                      value={retailPrice}
                      onChange={(e) => setRetailPrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-[#5a5a5a] focus:border-[#c8ff00] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-[0.12em] text-[#8a8a8a] mb-2">COMPARE AT ($)</label>
                    <input
                      type="number"
                      min={0}
                      value={compareAt}
                      onChange={(e) => setCompareAt(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-[#0f0f0f] border border-[#262626] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-[#5a5a5a] focus:border-[#c8ff00] outline-none transition-colors"
                    />
                  </div>
                </div>

                <SizeStockEditor
                  sizes={sizes}
                  onUpdateStock={(i, val) => setSizes((prev) => prev.map((s, idx) => (idx === i ? { ...s, stock: val } : s)))}
                  onAddSize={(label) => setSizes((prev) => [...prev, { size: label, stock: 0 }])}
                  onRemoveSize={(i) => setSizes((prev) => prev.filter((_, idx) => idx !== i))}
                />
              </AdminCard>

              <AdminCard icon={Palette} title="ATTRIBUTES">
                <ColorSwatchPicker
                  colors={colors}
                  selected={selectedColor}
                  onSelect={setSelectedColor}
                  onAddColor={(hex) => { setColors((prev) => [...prev, hex]); setSelectedColor(hex); }}
                />
              </AdminCard>
            </div>
          </div>

          <AdminCard
            icon={UploadCloud}
            title="PRODUCT MEDIA"
            className="mt-5"
            action={
              <div className="flex items-center gap-3">
                <span className="text-[#8a8a8a] text-xs font-semibold tracking-[0.1em]">ACTIVE DROP</span>
                <ToggleSwitch checked={activeDrop} onChange={setActiveDrop} label="Active drop" />
              </div>
            }
          >
            <MediaUploader
              masterImage={masterImage}
              additionalImages={additionalImages}
              onSetMaster={(file) => setMasterImage(URL.createObjectURL(file))}
              onRemoveMaster={() => setMasterImage(null)}
              onAddAdditional={(file) => setAdditionalImages((prev) => [...prev, URL.createObjectURL(file)])}
              onRemoveAdditional={(i) => setAdditionalImages((prev) => prev.filter((_, idx) => idx !== i))}
            />
          </AdminCard>
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}