interface careInstructionsProps {
  instructions: string[];
}

const CareInstructions = ({ instructions }: careInstructionsProps) => {
  if (!instructions || instructions.length === 0) {
    return null;
  }
  return (
    <div className="bg-sage/20 p-4 rounded-lg">
      <h3 className="font-semibold text-foreground mb-2">Care Instructions</h3>
      <ul className="text-muted-foreground space-y-1">
        {instructions.map((instruction, index) => (
          <li key={index} className="flex items-start">
            <span className="text-primary mr-2">•</span>
            {instruction}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CareInstructions;
