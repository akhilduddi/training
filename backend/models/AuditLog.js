const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: [
        'COMPANY_ADDED',
        'COMPANY_UPDATED',
        'COMPANY_STATUS_CHANGED',
        'COMPANY_VERIFIED',
        'COMPANY_BULK_IMPORTED',
        'USER_CREATED',
        'USER_UPDATED',
        'USER_DELETED',
        'USER_ROLE_CHANGED',
        'EMPLOYEE_ADDED',
        'REVIEW_APPROVED'
      ],
    },
    details: {
      type: String,
      required: true,
    },
    entityType: {
      type: String,
      required: true,
      enum: ['Company', 'User', 'Review', 'System'],
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      refPath: 'entityType',
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AuditLog', auditLogSchema);
