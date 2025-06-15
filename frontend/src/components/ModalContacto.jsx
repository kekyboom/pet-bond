
function ModalContacto({ isOpen, onClose, usuario }) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[300px] relative text-center">
                <button onClick={onClose} className="absolute top-3 right-3 text-pborange">
                    X
                </button>
                <h2 className="text-lg font-bold">DATOS DE CONTACTO</h2>
                 <p className="text-sm text-gray-500 mb-4">¡Contacta a "USUARIO"!</p>
                <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <span className="text-pbblue">@</span>
                        <span>correo@correo.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-pbblue">📞</span>
                        <span>+56 1234 5678</span>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default ModalContacto;
