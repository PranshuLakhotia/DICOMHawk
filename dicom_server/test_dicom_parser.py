
import unittest
from dicom_parser import DICOMParser
import os

class TestDICOMParser(unittest.TestCase):
    def setUp(self):
        self.test_file = '../dicom_files/test_file.dcm'
        self.parser = DICOMParser(self.test_file)

    def test_get_patient_info(self):
        patient_info = self.parser.get_patient_info()
        self.assertIn('PatientID', patient_info)
        self.assertIn('PatientName', patient_info)
        self.assertIn('PatientBirthDate', patient_info)
    # Check that values are either strings or 'N/A'
        for value in patient_info.values():
            self.assertTrue(isinstance(value, str))


    def test_get_study_info(self):
        study_info = self.parser.get_study_info()
        self.assertIn('StudyInstanceUID', study_info)
        self.assertIn('StudyDate', study_info)
        self.assertIn('StudyDescription', study_info)

    def test_get_series_info(self):
        series_info = self.parser.get_series_info()
        self.assertIn('SeriesInstanceUID', series_info)
        self.assertIn('SeriesDescription', series_info)
        self.assertIn('Modality', series_info)

if __name__ == '__main__':
    unittest.main()
