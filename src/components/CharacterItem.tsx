// Interface defining the expected props for a character item
interface ICharacterListProps {
  image: string;
  name: string;
  status: string;
}

// Rick and Morty character card
function CharacterItem(props: ICharacterListProps) {
  const { image, name, status } = props;

  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="card shadow">
        <img src={image} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text d-flex align-items-center">
            <span
              className={`rounded-circle me-2 ${
                status === "Alive"
                  ? "bg-success"
                  : status === "Dead"
                  ? "bg-danger"
                  : "bg-secondary"
              }`}
              style={{
                height: "1rem",
                width: "1rem",
              }}
            ></span>
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CharacterItem;
