# dicom_server/dicom_parser.py
import logging
import pydicom

class DICOMParser:
    def __init__(self, file_path):
        self.ds = pydicom.dcmread(file_path)

    def get_patient_info(self):
        return {
            'PatientID': getattr(self.ds, 'PatientID', 'N/A'),
            'PatientName': str(getattr(self.ds, 'PatientName', 'N/A')),
            'PatientBirthDate': getattr(self.ds, 'PatientBirthDate', 'N/A')
    }

    def get_study_info(self):
        return {
            'StudyInstanceUID': self.ds.StudyInstanceUID,
            'StudyDate': self.ds.StudyDate,
            'StudyDescription': getattr(self.ds, 'StudyDescription', 'N/A')
        }

    def get_series_info(self):
        return {
            'SeriesInstanceUID': self.ds.SeriesInstanceUID,
            'SeriesDescription': getattr(self.ds, 'SeriesDescription', 'N/A'),
            'Modality': self.ds.Modality
        }
