
# StyleSphere

**StyleSphere** is an AI-driven application designed to revolutionize fashion recommendations. By analyzing user attributes such as age, body type, height, color preferences, occasions, and seasons, StyleSphere delivers tailored outfit suggestions. This intelligent system combines real-time data integration and trend analysis, empowering users to elevate their style effortlessly.

---

## Key Features

- **Personalized Outfit Recommendations**: Tailored suggestions based on individual user profiles.
- **Trend Analysis**: Incorporates the latest fashion trends to enhance recommendations.
- **Seasonal Adaptation**: Adjusts choices based on current or preferred seasons.
- **Real-Time Integration**: Utilizes live data for dynamic insights.

---

## Database Information

The data used to create the recommendation system is sourced directly from **Myntra.com** using a custom Python script. Here's how the data was curated and used:

1. **Data Collection**:
   - Product images and details (such as category, color, fit, gender, occasion, and more) were extracted.
   - The data was stored in a structured format in a CSV file.

2. **Model Development**:
   - The curated data was used to create a recommendation model.
   - An **Outfit Pairing Model** was crafted by manually training the system. This included:
     - Defining rules for pairing outfits based on user attributes and preferences.
     - Setting guidelines for what outfits are suitable for various occasions, weather conditions, and personal styles.

3. **Manual Insights**:
   - Extensive manual curation was performed to ensure the model understands pairing logic.
   - For example:
     - "What suits best with jeans for a casual outing?"
     - "What is appropriate for a formal occasion during winter?"

This combination of automation and manual expertise ensures StyleSphere provides precise and user-centric recommendations.

---

## Installation

### Prerequisites
- Python 3.8 or higher
- Jupyter Notebook
- Required libraries: `pandas`, `numpy`, `scikit-learn`, `matplotlib`

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/Anushdubey01/StyleSphere.git
   ```
2. Navigate to the project folder:
   ```bash
   cd StyleSphere
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Launch the Jupyter Notebook:
   ```bash
   jupyter notebook
   ```

---

## Usage

1. Open one of the notebooks in the repository:
   - `analysis.ipynb`: Data exploration and preprocessing.
   - `code.ipynb`: Core logic for outfit recommendations.
   - `text model.ipynb`: NLP model for additional insights.
2. Follow the provided cells to input your preferences and execute the analysis.

### Example Workflow
- Input: Age, body type, color preferences, and occasion.
- Output: A curated list of outfits along with style insights.

---

## Repository Structure

- `README.md`: Documentation for the project.
- `analysis.ipynb`: Data exploration and visualization.
- `code.ipynb`: Main logic for recommendations.
- `text model.ipynb`: Auxiliary model for text-based data.
- `requirements.txt`: List of dependencies.

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`feature/YourFeatureName`).
3. Commit changes and push to your fork.
4. Submit a pull request.

---

## Future Enhancements

- Expand recommendations to include accessories and footwear.
- Integrate user feedback for adaptive learning.
- Add mobile compatibility for enhanced user experience.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For any queries or contributions, contact [Anushdubey01](https://github.com/Anushdubey01).
